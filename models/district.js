"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var districtSchema = new Schema({
    id: { type: Number, require: true, index: { unique: true } },
    city_id: Number,
    name: String
});

districtSchema.methods.findByCityId = function (cityId, callback) {
    this.model('District').find({ city_id: cityId }, callback);
};

module.exports = mongoose.model('District', districtSchema);

