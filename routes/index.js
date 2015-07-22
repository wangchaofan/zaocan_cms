var express = require('express');
var assert = require('assert');
var router = express.Router();
var crypto = require('crypto');
var async = require('async');
var Adv = require('../models/adv');
var City = require('../models/city');
var District = require('../models/district');
var Company = require('../models/company');

/* GET home page. */
router.get('/', function(req, res, next) {
    async.parallel({
        advs: function(callback) {
            Adv.find({}, function (err, data) {
                callback(err, data);
            });
        },
        cities: function(callback) {
            City.find({}).sort({id: 1}).exec(function (err, data) {
                callback(err, data);
            });
        },
        districts: function(callback) {
            var newDistrict = new District();
            newDistrict.findByCityId(1, function (err, data) {
                callback(err, data);
            });
        }
    }, function (err, result) {
        assert.ifError(err);
        res.render('index', { advs: result.advs, cities: result.cities, districts: result.districts });
    });
});

router.get('/queryCompany', function (req, res, next) {
    var value = req.query['keyword'],
        rgExp = new RegExp(value);
    async.parallel({
        data: function (callback) {
            Company.find({name: rgExp}, function (err, data) {
                callback(err, data);
            });
        }
    }, function (err, result) {
        if(err) {
            res.send({ data: [], status: 0 });
        } else {
            res.send({ data: result.data, status: 1 });
        }
    });
});
module.exports = router;
