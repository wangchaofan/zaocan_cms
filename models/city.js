"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var citySchema = new Schema({
    code: { type: String, required: true, index: { unique: true } },
    name: String
});

module.exports = global.zaoCanDb.model('City', citySchema);

