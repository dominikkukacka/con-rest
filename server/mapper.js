// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function mapperScope(mongoose, queue, Mapper) {
  'use strict';

  var helper = require('./serverHelper');

  function getMappers(req, res) {
    return helper.getAll(Mapper, req, res);
  }

  function getMapperById(req, res) {
    return helper.getById(Mapper, req, res);
  }

  function saveMapper(req, res) {
    return helper.updateById(Mapper, req, res);
  }

  function createMapper(req, res) {
    return helper.createAndReturnId(Mapper, req, res);
  }

  function deleteMapper(req, res) {
    return helper.deleteById(Mapper, req, res);
  }


  // will extract a value of an object using a map
  // a map can be a:
  //   * 'foo' - gets the property `foo` from the root of the provided object
  //   * 'foo.bar.baz' - you can chain property names to get deeper into the object
  //   * 'foo[0].bar' - goes into array `foo` index 0 and gets the object `bar`
  //   * 'foo[0][1][0].baz' - you can also go into nested arrays
  function singleMap(obj, map) {
    map = map.replace(/\]/g, '').replace(/\[/g, '.');

    var parts = map.split('.');
    var currentPointer = obj;
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      currentPointer = currentPointer[part];
    }

    return currentPointer;
  }

  function map(obj, maps) {
    var mappedValues = {};
    for (var i = 0; i < maps.length; i++) {
      var _map = maps[i];

      var value = singleMap(obj, _map.source);
      mappedValues[_map.destination] = value;
    }

    return mappedValues;
  }

  module.exports = {
    getMappers: getMappers,
    getMapperById: getMapperById,
    saveMapper: saveMapper,
    createMapper: createMapper,
    deleteMapper: deleteMapper,
    map: map
  };
}(require('mongoose'),
  require('q'),
  require('./resources/Mapper')
));
