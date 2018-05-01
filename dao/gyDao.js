// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var schedule = require("node-schedule");
var fs = require("fs");
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./gySqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.jsonp({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.jsonp(ret);
    }
};
module.exports = {
    userQuery: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.userQuery, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    userCreate: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.userCreate, [param.username, param.password], function(err, result) {
                param.id = result.insertId;
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    userDestroy: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.userDestroy, param.id, function(err, result) {
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    userUpdate: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.userUpdate, [param.username, param.password, param.id], function(err, result) {
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    userQueryID: function (req, res, next) {
        var param = req.query || req.params || req.body;
        pool.getConnection(function(err, connection) {
            connection.query($sql.userQueryID, [param.id], function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    home: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param.url = 'home';
        if(param.username === undefined || param.password === undefined){
            res.redirect('/');
        }else{
            pool.getConnection(function(err, connection) {
                connection.query($sql.home, [param.username, param.password], function(err, result) {
                    if(result.length > 0) {
                        res.render('home', {
                            title: 'Ihuokong',
                            user: result[0] ,
                            baseUrl: $conf.url
                        });
                    } else {
                        res.redirect('loginfail');
                    }
                    connection.release();
                });
            });
        }
    },
    contactQuery: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.contactQuery, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    contactCreate: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.contactCreate, [param.name, param.email, param.requires, param.phone, param.time, param.complete], function(err, result) {
                param.id = result.insertId;
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    contactDestroy: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.contactDestroy, param.id, function(err, result) {
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    contactUpdate: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.contactUpdate, [param.name, param.email, param.requires, param.phone, param.time, param.complete, param.id], function(err, result) {
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    ihkCreateAdd: function (req, res, next) {
        var param = req.query || req.params || req.body;
        pool.getConnection(function(err, connection) {
            connection.query($sql.contactCreate, [param.name, param.email, param.requires, param.phone, param.time, param.complete], function(err, result) {
                if(result.affectedRows > 0){
                    var data = {"msg":"true"};
                    res.jsonp(data);
                }else{
                    var data = {"msg":"false"};
                    res.jsonp(data);
                }
                connection.release();
            });
        });
    },
    vedioQuery: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.vedioQuery, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    vedioCreate: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.vedioCreate, [param.title, param.imgsrc, param.vediosrc], function(err, result) {
                param.id = result.insertId;
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    vedioDestroy: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.vedioDestroy, param.id, function(err, result) {
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    vedioUpdate: function (req, res, next) {
        var param = req.query || req.params || req.body;
        param = param.models;
        param =param[0];
        pool.getConnection(function(err, connection) {
            connection.query($sql.vedioUpdate, [param.title, param.imgsrc, param.vediosrc, param.id], function(err, result) {
                jsonWrite(res, param);
                connection.release();
            });
        });
    },
    vedioShow: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.vedioQuery, function(err, result) {
                var data = result;
                res.jsonp(data);
                connection.release();
            });
        });
    }
};