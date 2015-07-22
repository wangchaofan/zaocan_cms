"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var companySchema = new Schema({
    district_id: Number,
    name: String
});

companySchema.methods.findByDistrictId = function (districtId, callback) {
    this.model('Company').find({ district_id: districtId }, callback);
};

module.exports = mongoose.model('Company', companySchema);

