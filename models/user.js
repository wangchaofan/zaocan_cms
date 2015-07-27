"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var userSchema = new Schema({
    username: { type: String, required: true, minLength: 6, maxLength: 16, index: { unique: true } },
    password: { type: String, required: true }
});
validate()
userSchema.methods.findByUsername = function (cb) {
	this.model('User').findOne({username: this.username}, cb);
};

userSchema.statics.findByUsername = function(username,cb){
    this.findOne({username: username},cb);
};

module.exports = mongoose.model('User', userSchema);

