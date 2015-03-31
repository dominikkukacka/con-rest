// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function fileDAOScope(angular, clazz, undefined) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('fileDAO', function fileDAOScope(DAO) {
    function fileDAO() {
      this.extend = 'DAO';

      this.public = {
        getAll: function getAll() {
          return this.private.request('GET', '/api/files/');
        },
        getFile: function getfile(id) {
          return this.private.request('GET', '/api/files/' + id);
        },
        createFile: function createfile(data, file) {
console.log(data,file);
          return this.private.postWithFile('/api/files', data, file);
        },
        remove: function remove(id) {
          return this.private.request('DELETE', '/api/files/' + id);
        },
        updateFile: function updatefile(file) {
          return this.private.request('PUT', '/api/files/' + file._id,
            file);
        }
      };
    }

    var fileDAO = clazz('fileDAOScope', fileDAO);
    return new fileDAO();
  });
}(window.angular, window.enofjs.clazz));
