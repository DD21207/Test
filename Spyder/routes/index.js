/*
 * GET home page.
 */
//用于生成口令的散列值
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('index.html')
    });
    app.get('/reg', checkNotLogin);
    app.get('/reg', function(req, res) {
        res.render('reg', {
            title: '用户注册'
        });
    });
    app.post('/reg', checkNotLogin);
    app.post('/reg', function(req, res) {
        //检验用户两次输入的口令是否一致
        if (req.body['password-repeat'] != req.body['password']) {
            req.flash('error', '两次输入的口令不一致');
            return res.redirect('/reg');
        }
        //生成口令的散列
        var md5 = crypto.createHash("md5");
        var password = req.body.password;
        var newUser = new User({
            name: req.body.username,
            password: password
        });

        //检查用户名是否已经存在 
        User.get(newUser.name, function(err, user) {
            if (user)
                err = 'Username already exists.';
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            // 如果不存在则新增用户 
            newUser.save(function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;
                req.flash('success', ' 注册成功');
                res.redirect('/');
            });
        });
    });
    app.get('/login', checkNotLogin);
    app.get('/login', function(req, res) {
        res.render('login', {
            title: '用户登入',
        });
    });
    app.post('/login', checkNotLogin);
    app.post('/login', function(req, res) {
        //生成口令的散列值 
        var md5 = crypto.createHash('md5');
        var password = req.body.password;

        User.get(req.body.username, function(err, user) {
            if (!user) {
                req.flash('error', ' 用户不存在');
                return res.redirect('/login');
            }
            if (user.password != password) {
                req.flash('error', ' 用户口令错误');
                return res.redirect('/login');
            }
            req.session.user = user;
            res.contentType('json'); //返回的数据类型
            res.send(JSON.stringify({ status: "success" })); //给客户端返回一个json格式的数据
        });
    });
    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        req.session.user = null;
        req.flash('success', '登出成功');
        res.redirect('/');
    });
    //发表微博
    app.post('/post', checkLogin);
    app.post('/post', function(req, res) {
        var currentUser = req.session.user;
        var post = new Post(currentUser.name, req.body.post);
        post.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            req.flash('success', ' 发表成功');
            res.redirect('/u/' + currentUser.name);
        });
    });
    //用户页面
    app.get('/u/:user', function(req, res) {
        User.get(req.params.user, function(err, user) {
            if (!user) {
                req.flash('error', ' 用户不存在');
                return res.redirect('/');
            }
            Post.get(user.name, function(err, posts) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/');
                }
                res.render('user', {
                    title: user.name,
                    posts: posts
                });
            });
        });
    });
    //找回密码
    app.get('/getPwd', checkNotLogin);
    app.get('/getPwd', function(req, res) {
        res.render('getpwd', {
            title: '密码找回',
        });
    })


    app.post('/getPwd', checkNotLogin);
    app.post('/getPwd', function(req, res) {
        User.get(req.body.username, function(err, user) {
            if (!user) {
                req.flash('error', ' 用户不存在');
                return res.redirect('/getPwd');
            }
            req.flash('success', '成功找回密码:' + user.password);
            res.redirect('/login');
        });
    })
    app.post('/test', function(req, res) {
        //生成口令的散列值 
        var md5 = crypto.createHash('md5');
        var password = req.body.password;

        User.get(req.body.username, function(err, user) {
            if (!user) {
                res.contentType('json');
                return res.send(JSON.stringify({ status: "用户不存在" }));
            }
            if (user.password != password) {
                res.contentType('json');
                return res.send(JSON.stringify({ status: "密码错误" }));
            }
            req.session.user = user;
            res.contentType('json'); //返回的数据类型
            res.send(JSON.stringify(user));
            //给客户端返回一个json格式的数据
        });
    });
    app.get('/test1', function(req, res, next) {

        User.queryAll(req, res, next);
    })

    app.post('/test2', function(req, res, next) {
        User.queryTop(req, res, next);

    })
    app.post('/test3', function(req, res, next) {
        User.queryKey(req, res, next);

    })

    app.get('/jdmb1', function(req, res, next) {

        User.showTop(req, res, next);
    })
    app.get('/TMALLSUPER1', function(req, res, next) {

        User.showTopTS(req, res, next);
    })
    app.get('/yhd1', function(req, res, next) {

        User.showTopyhd(req, res, next);
    })
    app.get('/yhdmb1', function(req, res, next) {

        User.showTopyhdmb(req, res, next);
    })

    app.get('/SUNING1', function(req, res, next) {

        User.showTopsn(req, res, next);
    })
    app.get('/SUNINGMB1', function(req, res, next) {

        User.showTopsnM(req, res, next);
    })
    app.get('/jdpc1', function(req, res, next) {

        User.showTopjdpc(req, res, next);
    })

    app.get('/TMALL1', function(req, res, next) {

        User.showTopTM(req, res, next);
    })
    app.post('/jdmb2', function(req, res, next) {

        User.show(req, res, next);
    })
    app.post('/SUNING2', function(req, res, next) {

        User.showsn(req, res, next);
    })
    app.post('/SUNINGMB2', function(req, res, next) {

        User.showsnM(req, res, next);
    })

    app.post('/TMALLSUPER2', function(req, res, next) {

        User.showTS(req, res, next);
    })
    app.post('/TMALL2', function(req, res, next) {

        User.showTM(req, res, next);
    })


    app.post('/jdpc2', function(req, res, next) {

        User.showjdpc(req, res, next);
    })
    app.post('/yhd2', function(req, res, next) {

        User.showyhd(req, res, next);
    })

    app.post('/yhdmb2', function(req, res, next) {

        User.showyhdmb(req, res, next);
    })
    app.post('/jdmb3', function(req, res, next) {

        User.update(req, res, next);
    })

    app.post('/SUNINGMB3', function(req, res, next) {

        User.updateSNM(req, res, next);
    })
    app.post('/jdpc3', function(req, res, next) {

        User.updatejdpc(req, res, next);
    })

    app.post('/TMALLSUPER3', function(req, res, next) {

        User.updateTS(req, res, next);
    })

    app.post('/TMALL3', function(req, res, next) {

        User.updateTM(req, res, next);
    })

    app.post('/yhd3', function(req, res, next) {

        User.updateyhd(req, res, next);
    })
    app.post('/yhdmb3', function(req, res, next) {

        User.updateyhdmb(req, res, next);
    })

    app.post('/jdmb4', function(req, res, next) {

        User.update1(req, res, next);
    })
    app.post('/TMALLSUPER4', function(req, res, next) {

        User.updateTS1(req, res, next);
    })

    app.post('/TMALL4', function(req, res, next) {

        User.updateTM1(req, res, next);
    })

    app.post('/SUNING4', function(req, res, next) {

        User.updateSN1(req, res, next);
    })
    app.post('/SUNINGMB4', function(req, res, next) {

        User.updateSNM1(req, res, next);
    })
    app.post('/jdpc4', function(req, res, next) {

        User.updatejdpc1(req, res, next);
    })
    app.post('/yhd4', function(req, res, next) {

        User.updateyhd1(req, res, next);
    })
    app.post('/yhdmb4', function(req, res, next) {

        User.updateyhdmb1(req, res, next);
    })


    app.get('/screen_jd',function(req,res,next){
        User.showLast(req,res,next);
    })

    app.post('/screen_prev',function(req,res,next){
        User.showprev(req,res,next);
    })

    app.post('/screen_next',function(req,res,next){
        User.shownext(req,res,next);
    })

    app.post('/choose',function(req,res,next){
        User.choose(req,res,next);
    })

}




function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登入');
        return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}
