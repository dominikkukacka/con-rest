// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function MapperScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var mapperSchema = new Schema({
    name: String,
    maps: [{
      place: {
        type: String,
        required: true
      },
      source: {
        type: String,
        required: true
      },
      destination: {
        type: String,
        required: true
      }
    }]
  });

  module.exports = mongoose.model('Mapper', mapperSchema);

}(
  require('mongoose')
));
