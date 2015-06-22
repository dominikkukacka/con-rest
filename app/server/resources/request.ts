import {Schema} from 'mongoose';
import {Resource} from 'rest-io';
import workflow = require('./workflow');

var request = new Resource({
  name: 'request',
  model: {
    name: String,
    url: String,
    method: String,
    type: String,
    data: Schema.Types.Mixed,
    headers: Schema.Types.Mixed,
    files: [{
      boundaryName: String,
      file: {
        type: Schema.Types.ObjectId,
        ref: 'File'
      }
    }]
  },
  parentResource: workflow
});

export = request;
