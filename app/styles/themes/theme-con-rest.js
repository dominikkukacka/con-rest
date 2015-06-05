ace.define('ace/theme/con-rest', ['require', 'exports', 'module', 'ace/lib/dom'], function(require, exports, module) {
  exports.isDark = true;
  exports.cssClass = 'ace-con-rest';
  exports.cssText = '';

  var dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
