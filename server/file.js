// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function fileScope(mongoose, queue, File) {
  'use strict';

  var helper = require('./serverHelper');


  function getFiles(req, res) {
    return File.find()
      .select('-buffer')
      .exec()
      .then(function(data) {
        res.send(data);
      }, function(err) {
        res.send(500, err);
      });
  }


  function getFileById(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return File.findById(id)
      .exec()
      .then(function(data) {
        res.type(data.mime);
        res.end(data.buffer, 'binary');
      }, function(err) {
        res.send(500, err);
      });
  }

  // Delete specific REST call from database by its ID
  // Response is "Status: 200 OK" and "deleted" in body
  function deleteFile(req, res) {
    return helper.deleteById(File, req, res);
  }

  function createFile(req, res) {
    return helper.createAndReturnId(File, req, res);
  }

  function saveFile(req, res) {
    return helper.updateById(File, req, res);
  }

  module.exports = {
    deleteFile: deleteFile,
    saveFile: saveFile,
    getFiles: getFiles,
    getFileById: getFileById,
    createFile: createFile
  };
}(
  require('mongoose'),
  require('q'),
  require('./resources/File')
));
