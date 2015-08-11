"use strict";
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var extend = validate.extend;
var async = require('async');

var ValidationError = mongoose.Error.ValidationError;
var ValidatorError  = mongoose.Error.ValidatorError;

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

extend('notEmpty', function (val) {
    return !!val;
});

var citySchema = new Schema({
    code: { type: String,  index: { unique: true }, validate: [validate({ message: '代码不能为空', validator: 'notEmpty'})] },
    name: { type: String, validate: [validate({ message: '名称不能为空', validator: 'notEmpty'})] }
});

citySchema.pre('save', function (next) {
    var _this = this;
    /*检查代码是否重复*/
    global.zaoCanDb.model('City').findOne({ code: this.code }, function (err, re) {
       if(err) {
           next(err);
       } else {
           if(re) {
               var error = new ValidationError(_this);
               error.errors.code = new ValidatorError({
                   type: 'unique',
                   path: 'code',
                   value: _this.code,
                   message: '代码已存在'
               });
               next(error);
           } else {
               next();
           }
       }
    });
});

citySchema.statics.query = function (queryParam, callback) {
    var _this = this;
    async.parallel({
        records: function (callback) {
            _this.find({}).count(function (err, result) {
                callback(err, result);
            });
        },
        data: function (callback) {
            var _search = queryParam._search,
                rows = queryParam.rows,
                page = queryParam.page,
                sidx = queryParam.sidx,
                sord = queryParam.sord,
                searchField = queryParam.searchField,
                searchString = queryParam.searchString,
                searchOper = queryParam.searchOper;

            var query = _this.find({}).skip((page - 1)*rows).limit(rows);

            if(sord == "asc") {
                query.sort(sidx);
            } else {
                query.sort("-" + sidx);
            }

            query.exec(function (err, results) {
                if(err) {
                    callback(err, {});
                } else {
                    var data = {
                        page: page,
                        rows: results
                    };
                    callback(null, data);
                }
            });
        }
    }, function (err, results) {
       if(err) {
           callback(err, results);
       } {
            results.data['records'] = results.records;
            if(results.records === 0) {
                results.data['total'] = 0;
                results.data['page'] = 0;
            } else {
                results.data['total'] = Math.ceil(results.records/queryParam.rows);
            }
            callback(null, results.data);
        }
    });

};

module.exports = global.zaoCanDb.model('City', citySchema);

