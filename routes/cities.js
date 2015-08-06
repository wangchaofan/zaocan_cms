/**
 * Created by wangchaofan on 15/8/4.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var City = require('../models/city-model');
var app = express();
var zcms = require('../models/ZCMS');

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('city');
});
router.get('/lists', function(req, res){
    City.query(req.query, function (err, data) {
       if(err){
           res.send({error: err});
       } else {
           res.send(data);
       }
    });
});
router.post('/', function (req, res) {
    var oper = req.body['oper'],
        postData = req.body;
    delete postData.oper;
    if(oper === 'del') {

    } else if (oper === 'add') {
        var newCity = new City(postData);
        newCity.save(function (err, data) {
           res.send(zcms.initError(err));
        });
    } else {

    }
});
module.exports = router;
