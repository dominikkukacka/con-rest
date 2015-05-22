module Models {
  export class Serializable {
    constructor(json: Object) {
      this.forEach(json, (value, prop) => {
        this[prop] = value;
      });
    }

    forEach(json: Object, iterator: (value: Object, prop: string) => void) {
      for (var prop in json) {
        if (!json.hasOwnProperty(prop)) {
          continue;
        }
        iterator(json[prop], prop);
      }
    }

    convertContentToClass(array: Array<any>, Class) {
      var convertedArray: Array<any> = [];
      if (array instanceof Array) {
        array.forEach((value: any) => {
          var json = value;
          if(typeof value === 'string') {
            json = {
              _id: value
            };
          }
          convertedArray.push(new Class(json));
        });
      }
      return convertedArray;
    }

    convertIdToClass(id: string, Class) {
      if (!!id) {
        return new Class({
          _id: id
        });
      }
    }

    instantiateClass(json: Object, Class) {
      if(json instanceof Object) {
        return new Class(json);
      }
    }

    toJSON() {
      var json = {};
      this.forEach(this, (value, prop) => {
        if (value instanceof Function) {
          return;
        }
        json[prop] = value;
      });
    }
  }
}
