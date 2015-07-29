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

		newUser.checkLogin(function (err, result) {
			if(err)
				throw err;
			if(result) {
				req.session.user = result;
				res.redirect('/');
			} else {
				res.redirect('/login');
			}
		});
	});

module.exports = router;
