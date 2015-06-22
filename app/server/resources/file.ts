import {Schema} from 'mongoose';
import FileResource = require('../resourceTypes/fileResource');

var file = new FileResource({
  name: 'file',
  model: {
    name: String,
    mime: String,
    buffer: Buffer
  }
});

export = file;
