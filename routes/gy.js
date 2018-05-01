var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');

var tzDao = require('../dao/gyDao');

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: '登录' ,errormsg: ''});
});
router.get('/loginfail', function(req, res, next) {
    res.render('login', { title: '登录失败',errormsg: '用户名或密码错误，请重新登录'});
});
router.get('/userQuery', function(req, res, next) {
    tzDao.userQuery(req, res, next);
});
router.get('/userUpdate', function(req, res, next) {
    tzDao.userUpdate(req, res, next);
});
router.get('/userDestroy', function(req, res, next) {
    tzDao.userDestroy(req, res, next);
});
router.get('/userCreate', function(req, res, next) {
    tzDao.userCreate(req, res, next);
});
router.get('/home', function(req, res, next) {
    tzDao.home(req, res, next);
});
router.get('/contactQuery', function(req, res, next) {
    tzDao.contactQuery(req, res, next);
});
router.get('/contactUpdate', function(req, res, next) {
    tzDao.contactUpdate(req, res, next);
});
router.get('/contactDestroy', function(req, res, next) {
    tzDao.contactDestroy(req, res, next);
});
router.get('/contactCreate', function(req, res, next) {
    tzDao.contactCreate(req, res, next);
});
router.get('/ihkCreateAdd', function(req, res, next) {
    tzDao.ihkCreateAdd(req, res, next);
});
router.get('/vedioQuery', function(req, res, next) {
    tzDao.vedioQuery(req, res, next);
});
router.get('/vedioUpdate', function(req, res, next) {
    tzDao.vedioUpdate(req, res, next);
});
router.get('/vedioDestroy', function(req, res, next) {
    tzDao.vedioDestroy(req, res, next);
});
router.get('/vedioCreate', function(req, res, next) {
    tzDao.vedioCreate(req, res, next);
});
router.get('/vedioShow', function(req, res, next) {
    tzDao.vedioShow(req, res, next);
});
module.exports = router;


