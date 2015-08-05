var mongoose = require('mongoose');
var db = require('../models/db');
var City = require('../models/city');
var assert = require('assert');
var async = require('async');

var items = [
    { code: "001", name: "北京" },
    { code: "002", name: "成都" },
    { code: "003", name: "重庆" },
];

async.each(items, function (item, callback) {
    City.create(item, callback);
}, function (err) {
    if(err) {
        console.log('error');
    } else {
        console.log('success');
        //cleanup();
    }
});

function cleanup() {
    City.remove(function () {
        mongoose.disconnect();
    });
}