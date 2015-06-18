module globals {
  var English = require('yadda').localisation.English;
  export var library = English.library();
  
  export function createIdBasedOnName(name: string) {
    var id = convertToHex(name);
    var i = 0;
    while (id.length < 24) {
      id += i++;
      if (i > 9) {
        i = 0;
      }
    }
    return id;
  }

  export function convertToHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
      hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
  }
}

export = globals;
