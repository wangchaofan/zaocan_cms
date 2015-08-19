/**
 * Created by wangchaofan on 15/8/12.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var districtModel = require('../models/districtModel');
var zcms = require('../models/ZCMS');

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('district');
});
router.get('/lists', function(req, res){
    districtModel.query(req.query, function (err, data) {
        if(err){
            res.send({error: err});
        } else {
            res.send(data);
        }
    });
});
router.post('/', function (req, res) {
    var postData = req.body;
    delete postData._id;
    delete postData.__v;
    districtModel.create(postData, function (err) {
        res.send(zcms.initError(err));
    });
});
router.put('/', function (req, res) {
    var postData = req.body;
    districtModel.findByIdAndUpdate(postData._id, postData, function (err, re) {
        res.send(zcms.initError(err));
    });
});
router.delete('/', function (req, res) {
    districtModel.findByIdAndRemove(req.body['_id'], function (err, re) {
        res.send(zcms.initError(err));
    });
});
module.exports = router;
