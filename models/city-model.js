"use strict";
var mongoose = require('mongoose');
var async = require('async');

var Schema = mongoose.Schema,
    ObjectId = Schema.Object;

var citySchema = new Schema({
    code: { type: String, required: true, index: { unique: true } },
    name: String
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
                sord = queryParam.sord;

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

