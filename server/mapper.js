// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose, queue) {
    'use strict';

    var Schema = mongoose.Schema;

    var mapperSchema = new Schema({
        name: String,
        map: [{
            source: String,
            destination: String
        }]
    });

    var Mapper = mongoose.model('Mapper', mapperSchema);

    function getMappers(req, res) {
        var deferred = queue.defer();
        Mapper.find(deferred.makeNodeResolver());
        deferred.promise.then(function returnResults(results) {
            res.send(results);
        });
        return deferred.promise;
    }

    function getMapperById(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        Mapper.findById(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnCall(call) {
            res.send(call);
        });
        return deferred.promise;
    }

    function saveMapper(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        var details = req.body;
        var mapper = null;
        return queue().
            then(function getExistingMapper() {
                var deferred = queue.defer();
                Mapper.findById(id, deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function modifyWorkflow(retrievedMapper) {
                var deferred = queue.defer();
                mapper = retrievedMapper;
                mapper.name = details.name;
                mapper.map = details.map;
                mapper.save(deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function returnTrue() {
                var deferred = queue.defer();
                deferred.resolve(mapper);
                res.send('ok');
                return deferred.promise;
            });
    }

    function createMapper(req, res) {
        var mapper = new Mapper(req.body);
        var deferred = queue.defer();
        mapper.save(deferred.makeNodeResolver());
        deferred.promise.then(function saveNewCall() {
            res.send(mapper.id);
        });
        return deferred.promise;
    }

    function deleteMapper(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        Mapper.findByIdAndRemove(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnDeleted() {
            res.send('deleted');
        });
        return deferred.promise;
    }

    module.exports = {
        Mapper: Mapper,
        getMappers: getMappers,
        getMapperById: getMapperById,
        saveMapper: saveMapper,
        createMapper: createMapper,
        deleteMapper: deleteMapper
    };
}(require('mongoose'), require('q')));