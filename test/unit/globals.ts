interface String {
  toCamelCase(): string;
  toSnakeCase(): string;
}

String.prototype.toCamelCase = function() {
  return this.toLowerCase().replace(/ (.)/g, (match, firstLetter) => {
    return firstLetter.toUpperCase();
  });
};

String.prototype.toSnakeCase = function() {
  return this.replace(/ (.)|[A-Z]/g, function(capitalLetter: string, firstLetter: string) {
    var letter = firstLetter || capitalLetter.toLowerCase();
    return '-' + letter;
  });
};

interface JQuery {
  scope: any;
}
