(function serverHelperScope() {
  'use strict';

  // Helper function to send and resolve
  function sendAndResolve(res) {
    return function resultFound(result) {
      res.send(result);
      return result;
    };
  }

  module.exports = {
    sendAndResolve: sendAndResolve
  };
}());
