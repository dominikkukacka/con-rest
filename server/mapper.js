// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose) {
    'use strict';

    var Schema = mongoose.Schema;

    var mapperSchema = new Schema({
        map: [{
            source: String,
            destination: String
        }]
    });

    var Mapper = mongoose.model('Mapper', mapperSchema);

    module.exports = {
        Mapper: Mapper,
    };
}(require('mongoose')));