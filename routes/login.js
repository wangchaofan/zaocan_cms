var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var async = require('async');
var User = require('../models/user');

function initUser(req) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body['password']).digest('base64');
	return new User({
		username: req.body['username'],
		password: password
	});
}

router.route('/')
	.get(function(req, res, next) {
    	res.render('login');
	})
	.post(function (req, res, next) {
		var newUser = initUser(req);

		newUser.save(function (err) {
			if(err) {
				throw err;
			}
			res.redirect('/login', { status:0, message: "用户名不存在"});
		});
		//newUser.findByUsername(function (err, result) {
		//	if(err) {
		//		throw err;
		//	}
		//	if(!result) {
		//		newUser.save(function (err) {
		//			if(err) {
		//				throw err;
		//			}
		//			res.redirect('/login', { status:0, message: "用户名不存在"});
		//		});
		//	}  else if (result._doc.password !== newUser.password){
		//		res.redirect('/login', { status:0, message: "密码错误"});
		//	} else {
		//		req.session.user = result[0];
		//		res.redirect('/');
		//	}
		//});
	});

module.exports = router;
