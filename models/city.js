"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var citySchema = new Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: String
});

module.exports = mongoose.model('City', citySchema);

