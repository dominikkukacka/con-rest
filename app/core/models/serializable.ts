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
      array.forEach((value: string) => {
        convertedArray.push(new Class({
          _id: value
        }));
      });
      return convertedArray;
    }

    convertIdToClass(id: string, Class) {
      if(!!id) {
        return new Class({
          _id: id
        });
      }
    }

    toJSON() {
      var json = {};
      this.forEach(this, (value, prop) => {
        if(value instanceof Function) {
          return;
        }
        json[prop] = value;
      });
    }
  }
}
