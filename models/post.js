var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Post(name,title,post,category){
	this.name = name;
	this.title = title;
	this.post = post;
	this.category = category;
}

module.exports = Post;
Post.prototype.save = function(callback){
	var date = new Date();

	var time = {
		date : date,
		year : date.getFullYear(),
		month : date.getFullYear() + "-" + (date.getMonth() +1 ),
		day : date.getFullYear() + "-" + (date.getMonth() +1 ) + "-" + date.getDate(),
		minute : date.getFullYear() + "-" + (date.getMonth() +1 ) + "-" + date.getDate()+" "+date.getHours()+":"+(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	}

	var post={
		name: this.name,
		time:time,
		title:this.title,
		post:this.post,
		category:this.category
	} ;

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection("article",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.insert(post,{
				safe:r=true
			},function(err){
				if(err){
					return callback(err)
				}
				callback(null);
				mongodb.close();
			})
		})
	})
}

Post.getAll = function(category,page,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		console.log(category)
		db.collection("article",function(err,collection){
			
			if(err){
				mongodb.close();
				return callback(err);
			}

			var query={};
			if(category){
				query.category=category; 
			}

			collection.count(query,function(err,total){
				collection.find(query,{
					skip:(page - 1)*30,
					limit:30
				}).sort({
					time:-1
				}).toArray(function(err,docs){
					mongodb.close();
					if(err){
						return callback(err)
					}

					callback(null,docs,total);
				})
			})
		})
	})
}
Post.getTen = function(category,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		console.log(category)
		db.collection("article",function(err,collection){
			
			if(err){
				mongodb.close();
				return callback(err);
			}

			var query={};
			if(category){
				query.category=category; 
			}

			collection.count(query,function(err,total){
				collection.find(query,{
					skip:0,
					limit:10
				}).sort({
					time:-1
				}).toArray(function(err,docs){
					mongodb.close();
					if(err){
						return callback(err)
					}
					
					callback(null,docs,total);
				})
			})
		})
	})
}

Post.getOne = function(id,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection("article",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				"_id":ObjectID(id)
			},function(err,doc){
				if(err){
					mongodb.close();
					return callback(err);
				}

				callback(null,doc);
				mongodb.close();
			})
		})
	})
}

Post.update = function(id,post,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection("article",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.update({
				"_id":ObjectID(id)
			},{
				$set:{post:post}
			},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null)
			})
		})
	})
}

Post.remove = function(id,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection("article",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

		collection.remove({
			"_id":ObjectID(id)
		},{
			w:1
		},function(err){
			mongodb.close();
			if(err){
				return callback(err)
			}
			callback(null)
		})
		})
	})
}

Post.search = function(keyword,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection("article",function(err,collection){
			if(err){
				mongodb.close()
			}
			var patten = new RegExp(keyword,"i");

			collection.find({
				"title":patten
			},{
				"name":1,
				"time":1,
				"title":1,
				"post":1,
				"category":1
			}).sort({
				time:-1
			}).toArray(function(err,docs){
				mongodb.close()
				if(err){
					return callback(err)
				}

				callback(null,docs)
			})
		})
	})
}
