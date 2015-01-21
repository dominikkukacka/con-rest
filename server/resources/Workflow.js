// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function WorkflowScope(mongoose, Connector, APICall) { // jshint ignore:line
  'use strict';

  var Schema = mongoose.Schema;

  var workflowSchema = new Schema({
    name: String,
    calls: [{
      type: Schema.Types.ObjectId,
      ref: 'APICall'
    }],
    connectors: [Connector.schema]
  });

  module.exports = mongoose.model('Workflow', workflowSchema);

}(
  require('mongoose'),
  require('./Connector'),
  require('./APICall')
));
