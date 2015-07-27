/**
 * Created by wangchaofan on 15/7/27.
 */
var mongoose = require('mongoose');
var db = require('../models/db');
var User = require('../models/user');
var assert = require('assert');
var crypto = require('crypto');

var md5 = crypto.createHash('md5');
var user = new User({
    username: 'chan11',
    password: md5.update('123456').digest('base64')
});

user.save(function (err, re) {
    if(err)
        throw err;
    cleanup();
});

function cleanup() {
    User.remove(function () {
        mongoose.disconnect();
    });
}