import {SubResource} from 'rest-io';
import {Schema} from 'mongoose';
import workflow = require('./workflow');

var connector = new SubResource({
  name: 'connector',
  populate: 'connectors.source connectors.destination connectors.mapper',
  parentResource: workflow
});

export = connector;
