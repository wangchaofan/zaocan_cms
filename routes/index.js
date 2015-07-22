var express = require('express');
var assert = require('assert');
var router = express.Router();
var crypto = require('crypto');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
