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

  // Default get all
  function getAll(model, req, res) {
    return model.find()
      .exec()
      .then(sendAndResolve(res));
  }

  // Default get by id
  function getById(model, req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return model.findById(id)
      .exec()
      .then(sendAndResolve(res));
  }

  // Default deleting by id
  function deleteById(model, req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return model.findByIdAndRemove(id)
      .exec()
      .then(function returnDeleted() {
        res.send('deleted');
      });
  }

  // Default creating new by id
  function createAndReturnId(model, req, res) {
    return model.create(req.body)
      .then(function sendId(result) {
        res.send(result._id.toString());
      });
  }

  // Default update by id
  function updateById(model, req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return model.findByIdAndUpdate(id, {
        $set: req.body
      })
      .exec()
      .then(function(result) {
        res.send('ok');
        return result;
      });
  }

  module.exports = {
    createAndReturnId: createAndReturnId,
    deleteById: deleteById,
    getAll: getAll,
    getById: getById,
    sendAndResolve: sendAndResolve,
    updateById: updateById
  };
}());
