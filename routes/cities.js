/**
 * Created by wangchaofan on 15/8/4.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var City = require('../models/city-model');
var app = express();

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
module.exports = router;
