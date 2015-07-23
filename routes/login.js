var express = require('express');
var assert = require('assert');
var router = express.Router();
var crypto = require('crypto');
var async = require('async');

router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;
