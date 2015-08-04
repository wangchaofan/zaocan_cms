/**
 * Created by wangchaofan on 15/8/4.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var City = require('../models/city');

/* GET users listing. */
router.route('/')
    .get(function(req, res, next) {
        City.find({}, function (err, data) {
            if(err)
                throw err;
            res.render('city', { cities: data });
        });
    });

module.exports = router;
