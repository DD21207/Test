var express = require('express');
var crypto = require('crypto'),
    User = require('../models/user.js'),
    Post = require('../models/post.js');
var fs = require('fs');
var multer = require('multer');
var formidable = require('formidable');

var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('index.html');
    });

    app.get('/reg', checkNotLogin);
    app.get('/reg', function(req, res, next) {
        res.redirect('reg.html');
    });

    app.post('/reg', checkNotLogin);
    app.post('/reg', function(req, res, next) {
        User.reg(req, res, next);
    });
    app.post('/update_password', function(req, res, next) {
        User.update(req, res, next);
    });
    app.get('/login', checkNotLogin);
    app.get('/login', function(req, res, next) {
        res.redirect('login.html');
    });
    app.post('/login', checkNotLogin);
    app.post('/login', function(req, res, next) {
        User.login(req, res, next)
    });

    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        req.session.user = null;
        req.flash('success', '登出成功');
        res.contentType('json');
        var results = {
            result: 'success'
        }
        return res.send(JSON.stringify(results));
    });

    //获取该类别的top10
    app.post('/news_top', checkLogin);
    app.post('/news_top', function(req, res, next) {
        var category = req.body.category;
    
        Post.getTen(category,function(err, posts,total) {
            if (err) {
                posts = [];
            }
            res.contentType('json');
            var results = {
                posts: posts,
                total:total
            }
            return res.send(JSON.stringify(results));
        })
    });

    //分页top30
    app.post('/news', checkLogin);
    app.post('/news', function(req, res, next) {
        var page = req.body.page?parseInt(req.body.page) : 1;
        var category = req.body.category;       
        Post.getAll(category,page,function(err, posts,total) {
            if (err) {
                posts = [];
            }
            res.contentType('json');
            var results = {
                posts: posts,
                total:total
            }
            return res.send(JSON.stringify(results));
        })
    });

    //发表文章
    app.post('/post', checkLogin);
    app.post('/post', function(req, res, next) {
        var currentUser = req.session.user,
            post = new Post(currentUser.name, req.body.title, req.body.post,req.body.category);
       
        post.save(function(err) {
            if (err) {
                res.contentType('json');
                var results = {
                    result: 'error'
                }
                return res.send(JSON.stringify(results));
            }
            res.contentType('json');
            var results = {
                result: 'success'
            }
            return res.send(JSON.stringify(results));
        })
    });


    //获取各个类别的单独一篇文章
    app.post('/news', checkLogin);
    app.post('/newsOne', function(req, res, next) {
        var id = req.body.id
        Post.getOne(id, function(err, post) {
            if (err) {
                res.contentType('json');
                var results = {
                    result: 'error'
                }
                return res.send(JSON.stringify(results));
            }
            res.contentType('json');
            var results = {
                post: post
            }
            return res.send(JSON.stringify(results));

        })
    })


    //修改文章
    app.post('/update', function(req, res, next) {
        var id = req.body.id;
        var post = req.body.post;
        Post.update(id, post, function(err) {
            if (err) {
                res.contentType('json');
                var results = {
                    result: 'error'
                }
                return res.send(JSON.stringify(results));
            }
            res.contentType('json');
            var results = {
                update: "success"
            }
            return res.send(JSON.stringify(results));
        })
    })


    //删除文章
    app.post('/remove', function(req, res, next) {
            var id = req.body.id;
            Post.remove(id, function(err) {
                if (err) {
                    res.contentType('json');
                    var results = {
                        result: 'error'
                    }
                    return res.send(JSON.stringify(results));
                }
                res.contentType('json');
                var results = {
                    remove: "success"
                }
                return res.send(JSON.stringify(results));
            })
        })
    //题目搜索

    app.post('/search',checkLogin);
    app.post('/search',function(req,res,next){
        Post.search(req.body.keyword,function(err,posts){
            if (err) {
                res.contentType('json');
                var results = {
                    result: 'error'
                }
                return res.send(JSON.stringify(results));
            }
            res.contentType('json');
            var results = {
                post: posts
            }
            return res.send(JSON.stringify(results));
        })
    })
    //图片上传
    app.post('/uploadImg', checkLogin);
    app.post('/uploadImg', function(req, res, next) {
        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = __dirname + '/../web/upload';
        form.parse(req, function(err, fields, files) {
            if (err) {
                throw err;
            }
            var image = files.imgFile;
            var path = image.path;
            path = path.replace('/\\/g', '/');
            var url = '/upload' + path.substr(path.lastIndexOf('/'), path.length);
            var info = {
                "error": 0,
                "url": url
            };
            res.send(info);
        });
    });


};


function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', ' 无登录');
        res.contentType('json');
        var results = {
            result: '无登录'
        }
        return res.send(JSON.stringify(results));
    }
    next();
}


function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', ' 已登录');
        res.contentType('json');
        var results = {
            result: '已登录'
        }
        return res.send(JSON.stringify(results));
    }
    next();
}
