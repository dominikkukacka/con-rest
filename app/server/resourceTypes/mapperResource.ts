import {Resource} from 'rest-io';
import {Response, Request} from 'express';
import {Document} from 'mongoose';
import request = require('request');

interface IMap {
  place: string
  source: string,
  destination: string,
  value: string
}

interface IMapper {
  maps: [IMap]
}

interface IRequest {
  url: string,
  data: any,
  headers: any
}

class MapperResource extends Resource {


  // will extract a value of an object using a map
  // a map can be a:
  //   * 'foo' - gets the property `foo` from the root of the provided object
  //   * 'foo.bar.baz' - you can chain property names to get deeper into the object
  //   * 'foo[0].bar' - goes into array `foo` index 0 and gets the object `bar`
  //   * 'foo[0][1][0].baz' - you can also go into nested arrays
  singleMap(obj: Object, map: String) {
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
  createObjectFromMap(map: String, value: Object) {
    map = map.replace(/\]/g, '').replace(/\[/g, '.');

    var obj = {};
    var parts = map.split('.');
    for (var i = parts.length - 1; i >= 0; i--) {
      var newObj = {};
      //create indexed array if part is numeric
      if (!isNaN(Number(parts[i]))) {
        newObj = [];
        var part = Number(part[i]);
      } else {
        var part = part[i];
      }


      // the deepest key holds the value
      if (i === parts.length - 1) {
        newObj[part] = value;
      } else {
        newObj[part] = obj;
      }
      obj = newObj;
    }

    return obj;

  }

  map(obj: Object, mapper: IMapper) {
    var mappedValues = [];
    for (var i = 0; i < mapper.maps.length; i++) {
      var _map = mapper.maps[i];

      var value = this.singleMap(obj, _map.source);
      mappedValues.push({
        place: _map.place,
        source: _map.source,
        destination: _map.destination,
        value: value
      });
    }

    return mappedValues;
  }

  modifyCall(call: IRequest, mappedValues: Array<IMap>) {
    for (var i = 0; i < mappedValues.length; i++) {
      var mappedValue = mappedValues[i];
      switch (mappedValue.place) {
        case 'url':
          var regex = new RegExp(mappedValue.destination, 'g');
          var url = call.url.replace(regex, mappedValue.value);
          call.url = url;
          break;

        case 'data':
        case 'header':
          var additionalData = this.createObjectFromMap(mappedValue.destination, mappedValue.value);

          if (mappedValue.place === 'data') {
            if (!!!call.data) {
              call.data = {};
            }
            call.data = call.data.concat(additionalData);
          } else {
            if (!!!call.headers) {
              call.headers = {};
            }
            call.headers = call.headers.concat(additionalData);
          }
          break;
      }
    }

    return call;
  }

}

export = MapperResource;
