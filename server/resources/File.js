// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiCallScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var fileSchema = new Schema({
    name: String,
    mime: String,
    buffer: Buffer
  });

  module.exports = mongoose.model('File', fileSchema);

}(
  require('mongoose')
));
