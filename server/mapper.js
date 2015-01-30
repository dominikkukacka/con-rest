// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function mapperScope(mongoose, queue, _, Mapper) {
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

  // will create an object which you can parse through the singleMap function
  function createObjectFromMap(map, value) {
    map = map.replace(/\]/g, '').replace(/\[/g, '.');

    var obj = {};
    var parts = map.split('.');
    for (var i = parts.length -1; i >= 0; i--) {
      var part = parts[i];

      var newObj = {};
      //create indexed array if part is numeric
      if(!isNaN(part)) {
        newObj = [];
        part = parseInt(part, 10);
      }


      // the deepest key holds the value
      if(i === parts.length - 1) {
        newObj[part] = value;
      } else {
        newObj[part] = obj;
      }
      obj = newObj;
    }

    return obj;

  }

  function map(obj, mapper) {
    var mappedValues = [];
    for (var i = 0; i < mapper.maps.length; i++) {
      var _map = mapper.maps[i];

      var value = singleMap(obj, _map.source);
      mappedValues.push({
        place: _map.place,
        source: _map.source,
        destination: _map.destination,
        value: value
      });
    }

    return mappedValues;
  }

  function modifyCall(call, mappedValues) {
    for (var i = 0; i < mappedValues.length; i++) {
      var mappedValue = mappedValues[i];
      switch(mappedValue.place) {
        case 'url':
          var regex = new RegExp(mappedValue.destination, 'g');
          var url = call.url.replace(regex, mappedValue.value);
          call.url = url;
          break;

        case 'data':
        case 'header':
          var additionalData = createObjectFromMap(mappedValue.destination, mappedValue.value);

          if(mappedValue.place === 'data') {
            if(!!!call.data) {
              call.data = {};
            }
            call.data = _.extend(call.data, additionalData);
          } else {
            if(!!!call.headers) {
              call.headers = {};
            }
            call.headers = _.extend(call.headers, additionalData);
          }
          break;
      }
    }

    return call;
  }

  module.exports = {
    getMappers: getMappers,
    getMapperById: getMapperById,
    saveMapper: saveMapper,
    createMapper: createMapper,
    deleteMapper: deleteMapper,
    map: map,
    createObjectFromMap: createObjectFromMap,
    modifyCall: modifyCall,
  };
}(require('mongoose'),
  require('q'),
  require('underscore'),
  require('./resources/Mapper')
));
