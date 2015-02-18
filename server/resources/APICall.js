// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiCallScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var apiCallSchema = new Schema({
    name: String,
    url: String,
    method: String,
    type: String,
    data: Schema.Types.Mixed,
    headers: Schema.Types.Mixed,
    file: {
      mime: String,
      bin: Buffer
    }
  });

  module.exports = mongoose.model('APICall', apiCallSchema);

}(
  require('mongoose')
));
