(function serverHelperScope(_) {
  'use strict';
  var mongoose = require('mongoose');

  // Helper function to send and resolve
  function sendAndResolve(res) {
    return function resultFound(result) {
      res.send(result);
      return result;
    };
  }

  function errorHandler(res) {
    return function handleError(error) {
      console.log(error);
      res.status(500).send('Internal server error');
    };
  }

  // Default get all
  function getAll(model, req, res, modifier) {
    return model.find()
      .exec()
      .then(function(data) {
        if(modifier){
          return modifier(data);
        }

        return data;
      })
      .then(sendAndResolve(res),
        errorHandler(res));
  }

  // Default get by id
  function getById(model, req, res, modifier) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return model.findById(id)
      .exec()
      .then(function(data) {
        if(modifier){
          return modifier(data);
        }

        return data;
      })
      .then(sendAndResolve(res),
        errorHandler(res));
  }

  // Default deleting by id
  function deleteById(model, req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return model.findByIdAndRemove(id)
      .exec()
      .then(function returnDeleted() {
        res.send('deleted');
      }, errorHandler(res));
  }

  // Default creating new by id
  function createAndReturnId(model, req, res) {

    var data = extractData(req);

    return model.create(data)
      .then(function sendId(result) {
        res.send(result._id.toString());
      }, errorHandler(res));
  }

  // Default update by id
  function updateById(model, req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    // Make sure the _id will not be reAssigned.
    var data = extractData(req);
    delete data.id;
    return model.findByIdAndUpdate(id, {
        $set: data
      })
      .exec()
      .then(function(result) {
        res.send('ok');
        return result;
      }, errorHandler(res));
  }

  function extractData(req) {
    var data = {};
    if(req.body) {
      for(var key in req.body) {
        var value = req.body[key];

        // try to json parse value
        try {
          value = JSON.parse(value);
        } catch(e) {}

        data[key] = value;
      }
    }

    if(req.files) {
      for(var key in req.files) {
        var file = req.files[key];
        data[key] = {
          mime: file.mimetype,
          buffer: file.buffer
        };
      }
    }

    return data;
  }

  module.exports = {
    createAndReturnId: createAndReturnId,
    deleteById: deleteById,
    getAll: getAll,
    getById: getById,
    sendAndResolve: sendAndResolve,
    updateById: updateById
  };
}(require('underscore')));
