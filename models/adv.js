/**
 * Created by wangchaofan on 15/7/16.
 */
"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var advertisementSchema = new Schema({
    name: String,
    img_url: String,
    link_url: String
});

module.exports = mongoose.model('Advertisement', advertisementSchema);