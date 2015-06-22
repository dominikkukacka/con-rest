import {Resource} from 'rest-io';
import {Schema} from 'mongoose';

var workflow = new Resource({
  name: 'workflow',
  model: {
    name: String,
    calls: [{
      type: Schema.Types.ObjectId,
      ref: 'Request'
    }],
    connectors: [{
      source: {
        type: Schema.Types.ObjectId,
        ref: 'Request'
      },
      destination: {
        type: Schema.Types.ObjectId,
        ref: 'Request'
      },
      mapper: {
        type: Schema.Types.ObjectId,
        ref: 'Mapper'
      }
    }]
  }
});

export = workflow;
