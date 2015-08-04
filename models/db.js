"use strict";
var mongoose = require( 'mongoose' );
var async = require('async');
// Build the connection string
var zaocan_uri = 'mongodb://localhost:27017/zaocan';
var zaocan_cms_uri = 'mongodb://localhost:27017/zaocan_cms';
// Create the database connection
global.zaoCanDb = mongoose.createConnection(zaocan_uri);
global.zaoCanCmsDb = mongoose.createConnection(zaocan_cms_uri);

var dbArr = [zaoCanDb, zaoCanCmsDb];

async.each(dbArr, function (item, callback) {
    item.on('connected', function () {
        console.log('Mongoose connected to ' + 'mongodb://'+ this.host + ":" + this.port + "/" + this.name);
    });
    item.on('error',function (err) {
        console.log('Mongoose connection error: ' + err);
    });
    item.on('disconnected', function () {
        console.log(this.name + ' disconnected');
    });
}, function (err) {
    if(err) {
        console.log('error');
    } else {
        console.log('success');
    }
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
