import {Schema} from 'mongoose';
import {Resource} from 'rest-io';
import MapperResource = require('../resourceTypes/mapperResource');

var mapper = new MapperResource({
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
