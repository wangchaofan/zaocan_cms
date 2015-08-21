/**
 * Created by wangchaofan on 15/8/4.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var cityModel = require('../models/cityModel');
var zcms = require('../models/ZCMS');

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('city');
});
router.get('/lists', function(req, res){
    cityModel.query(req.query, function (err, data) {
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
    var newCity = new cityModel(postData);
    newCity.save(function (err) {
       res.send(zcms.initError(err));
    });
});
router.put('/', function (req, res) {
    var postData = req.body;
    cityModel.findByIdAndUpdate(postData._id, postData, function (err, re) {
        res.send(zcms.initError(err));
    });
});
router.delete('/', function (req, res) {
   cityModel.findByIdAndRemove(req.body['_id'], function (err, re) {
       res.send(zcms.initError(err));
   });
});
router.get('/all', function (req, res) {
   cityModel.find({}, function (err, data) {
       if(err) {
           res.send({error: error});
       } else {
           res.send(data);
       }
   }) ;
});
module.exports = router;
