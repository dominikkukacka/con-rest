// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(mongoose, APICall, Mapper) { // jshint ignore:line
  'use strict';
  var Schema = mongoose.Schema;

  var connectorSchema = new Schema({
    source: {
      type: Schema.Types.ObjectId,
      ref: 'APICall'
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'APICall'
    },
    mapper: {
      type: Schema.Types.ObjectId,
      ref: 'Mapper'
    }
  });

  module.exports = mongoose.model('Connector', connectorSchema);

}(
  require('mongoose'),
  require('./APICall'),
  require('./Mapper')
));
