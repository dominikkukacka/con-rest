import {Schema} from 'mongoose';
import {Resource} from 'rest-io';

var mapper = new Resource({
  name: 'mapper',
  model: {
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
  }
});

export = mapper;
