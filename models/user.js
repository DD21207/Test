var mongodb = require('./db');
var crypto = require('crypto');

function User(user) {
    this.name = user.name;
    this.password = user.password;
};

module.exports = User;

User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
    }


    mongodb.open(function(err, db) {
        if (err) {
            return callback(err)
        }

        db.collection('user', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.insert(user, {
                safe: true
            }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user[0]);
            })
        })
    })
};

User.get = function(name, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('user', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.findOne({ name: name }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }

                callback(null, user)
            })
        })
    })
};

User.reg = function reg(req, res, next) {
    var name = req.body.username,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    if (password_re != password) {
        req.flash('error', '两次输入的密码不一致');
        res.contentType('json');
        var results = {
            result: '两次输入的密码不一致'
        }
        return res.send(JSON.stringify(results));
    }

    var cipher = crypto.createCipher('aes-256-cbc', 'InmbuvP6Z8')
    var key = "asdhjwheru*asd123-123"; //加密的秘钥
    var crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex')


    var password1 = crypted;
    var newUser = new User({
        name: req.body.username,
        password: password1
    });
    User.get(newUser.name, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }

        if (user) {
            req.flash('error', '用户已存在');
            res.contentType('json');
            var results = {
                result: '用户已存在'
            }
            return res.send(JSON.stringify(results));
        }

        newUser.save(function(err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            req.session.user = newUser;
            req.flash('success', ' 注册成功');
            res.contentType('json');
            var results = {
                result: '注册成功'
            }
            return res.send(JSON.stringify(results));
            //res.redirect('/'); 
        })
    })
}

User.update = function(req, res, next) {

    var cipher = crypto.createCipher('aes-256-cbc', 'InmbuvP6Z8')
    var key = "asdhjwheru*asd123-123"; //加密的秘钥
    var name = req.body.username;
    var old_password = req.body["old-password"];
    var new_password = req.body["new-password"];
    var password_re = req.body["password-repeat"];


    if (password_re != new_password) {
        req.flash('error', '两次输入的密码不一致');
        res.contentType('json');
        var results = {
            result: '两次输入的密码不一致'
        }
        return res.send(JSON.stringify(results));
    }


    User.get(name, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            res.contentType('json');
            var results = {
                result: '用户不存在'
            }
            return res.send(JSON.stringify(results));

        }

        var decipher = crypto.createDecipher('aes-256-cbc', 'InmbuvP6Z8')
        var dec = decipher.update(user.password, 'hex', 'utf8')
        dec += decipher.final('utf8')
        var user_password = dec;

        if (old_password != user_password) {
            req.flash('error', '用户名和密码存在错误');
            res.contentType('json');
            var results = {
                result: '用户名和密码存在错误'
            }
            return res.send(JSON.stringify(results));
        }

        mongodb.open(function(err, db) {
            if (err) {
                return callback(err);
            }
            var crypted = cipher.update(new_password, 'utf8', 'hex')
            crypted += cipher.final('hex')


            var password1 = crypted;

            db.collection('user', function(err, collection) {
                collection.update(user, {
                    $set: { password: password1 }
                }, function(err) {
                    mongodb.close();
                    if (err) {
                        mongodb.close();
                    }
                    req.flash('success', '修改成功');
                    res.contentType('json');
                    var results = {
                        result: '修改成功'
                    }
                    return res.send(JSON.stringify(results));
                })
            })
        })
    })




}

User.login = function(req, res, next) {

    var password = req.body.password

    User.get(req.body.username, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            res.contentType('json');
            var results = {
                result: '用户不存在'
            }
            return res.send(JSON.stringify(results));

        }

        var cipher = crypto.createCipher('aes-256-cbc', 'InmbuvP6Z8')
        var key = "asdhjwheru*asd123-123"; //加密的秘钥

        var decipher = crypto.createDecipher('aes-256-cbc', 'InmbuvP6Z8')
        var dec = decipher.update(user.password, 'hex', 'utf8')
        dec += decipher.final('utf8')
        var user_password = dec;
        if (user_password != password) {
            req.flash('error', ' 用户口令错误');
            res.contentType('json');
            var results = {
                result: '用户口令错误'
            }
            return res.send(JSON.stringify(results));

        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.contentType('json'); //返回的数据类型
        res.send(JSON.stringify({ status: "success" })); //给客户端返回一个json格式的数据
    });
}
