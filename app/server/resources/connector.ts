import {SubResource} from 'rest-io';
import {Schema} from 'mongoose';
import workflow = require('./workflow');

var connector = new SubResource({
  name: 'connector',
  parentResource: workflow
});

export = connector;
