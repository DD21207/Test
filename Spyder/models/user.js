var  client = require('../database');
var  uid = require('../utils/uuid');//用于生成id
function  User(user) {
    this.name = user.name;
    this.password = user.password;
}
var tableName = "user";
// mysql = client.getDbCon();
module.exports = User;
//新增用户
User.prototype.save = function  save(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password
    };
    uuid = uid.v4();
    //插入数据库
    var sql ="insert into user (id,name,password) values(?,?,?)";

    getDbCon.query(sql,[uuid,user.name,user.password],function(err,results,fields){
        if (err) {
            console.log(err)
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};
//获取用户
User.get =  function  get(username, callback) {

        // 读取 users 集合
        var sql = "select c.id,c.name,c.password from user c where c.name='"+username+"'";
        console.log(sql);
        getDbCon.query(sql,function(err,results,fields){
            if(err){
                console.log(err)
            }else{

                console.log(results[0]);
                callback(err,results[0],fields);
            }
        })

};

User.queryAll = function queryAll(req,res,next){
    var sql = "select * from sheet1 no_primary_key order by id limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');  
        return res.send(JSON.stringify(results));
        }
    })
}

User.queryTop = function queryTop(req,res,next){
    // var keyword = req.body.keyword;
    // var category = req.body.category;
    // var ecustomer = req.body.ecustomer;
    // var device = req.body.device;
    // var period = req.body.period;
    // var sql = "select SKU from sheet2 where keywords='"+keyword+
    // "' and category='"+category+"' and ecustomer='"+ecustomer+
    // "' and device='"+device+
    // "' and period='"+period+"' order by ranking limit 10";
    var dd = req.body.dd;
    return res.send(dd);
    // mysql.query(sql,function(err,results){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         res.contentType('json');
    //         return res.send(JSON.stringify(results));
    //     }
    // })
}
User.queryKey = function queryKey(req,res,next){
  
    var category = req.body.category;
    var sql = "select distinct keywords from sheet2 where category='"+category+
    "'";

    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
            res.contentType('json');
            return res.send(JSON.stringify(results));
        }
    })
}

User.showTop = function showTop(req,res,next){
    var sql = "select * from mb_jd no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.showTopTS = function showTop(req,res,next){
    var sql = "select * from pc_tmallsuper no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}  

User.showTopTM = function showTop(req,res,next){
    var sql = "select * from pc_tmall no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}


User.showTopjdpc = function showTop(req,res,next){
    var sql = "select * from pc_jd no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}


User.showTopyhd = function showTop(req,res,next){
    var sql = "select * from pc_yhd no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showTopyhdmb = function showTop(req,res,next){
    var sql = "select * from mb_yhd no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.showTopsn = function showTop(req,res,next){
    var sql = "select * from pc_suning no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showTopsnM = function showTop(req,res,next){
    var sql = "select * from mb_suning no_primary_key order by Add_time desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showsn = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from pc_suning no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showsnM = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from mb_suning no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.show = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from mb_jd no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showyhd = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from pc_yhd no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showyhdmb = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from mb_yhd no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.showTS = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from pc_tmallsuper no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.showTM = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from pc_tmall no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.showjdpc = function show(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from pc_jd no_primary_key order by Add_time desc limit "+number1+","+number2;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.update = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update mb_jd set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updateSN = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_suning set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updateSNM = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update mb_suning set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updateTS = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_tmallsuper set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.updateTM = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_tmall set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updatejdpc = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_jd set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updateyhd = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_yhd set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.updateyhdmb = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update mb_yhd set hot = 1 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.update1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update mb_jd set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.updateTM1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_tmall set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}

User.updateTS1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_tmallsuper set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updatejdpc1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_jd set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updateyhd1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_yhd set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}
User.updateyhdmb1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update mb_yhd set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}


User.updateSN1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update pc_suning set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}


User.updateSNM1 = function show(req,res,next){
    var pid = req.body.pid;
    var sql = "update mb_suning set hot = 0 where id='"+pid+"'";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        
        return res.send(JSON.stringify(results));
        }
    })
}



User.showLast = function showLast(req,res,next){
    var sql = "select * from mb_jd_screenshot no_primary_key order by id desc limit 10";
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        return res.send(JSON.stringify(results));
        }
    })
}


User.showprev = function showprev(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from mb_jd_screenshot no_primary_key order by id desc limit "+number1+","+number2;

    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        return res.send(JSON.stringify(results));
        }
    })
}


User.shownext = function shownext(req,res,next){
    var number = req.body.number;
    var number1 = number*10;
    var number2 = 10;
    var sql = "select * from mb_jd_screenshot no_primary_key order by id desc limit "+number1+","+number2;

    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        return res.send(JSON.stringify(results));
        }
    })
}


User.choose = function choose(req,res,next){
    var choose = req.body.choose;
    var sql = "select * from mb_jd_screenshot no_primary_key WHERE name="+choose;
    console.log(sql);
    console.log(req.session.user);
    mysql.query(sql,function(err,results){
        if(err){
            console.log(err)
        }else{
        res.contentType('json');
        return res.send(JSON.stringify(results));
        }
    })
}