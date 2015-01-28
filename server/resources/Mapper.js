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
      place: String,
      source: String,
      destination: String
    }]
  });

  module.exports = mongoose.model('Mapper', mapperSchema);

}(
  require('mongoose')
));
