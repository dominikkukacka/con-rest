(function serverHelperScope() {
  'use strict';
  var mongoose = require('mongoose');

  // Helper function to send and resolve
  function sendAndResolve(res) {
    return function resultFound(result) {
      res.send(result);
      return result;
    };
  }

  // Default GetById function
  function getById(model, req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return model.findById(id)
      .exec()
      .then(sendAndResolve(res));
  }

  module.exports = {
    getById: getById,
    sendAndResolve: sendAndResolve
  };
}());
