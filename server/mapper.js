// con-rest
// Version: 0.0.1
//
// Author: Dominik Kukacka
// Fork me on Github: https://github.com/EnoF/con-rest
(function mapperScope(mongoose, queue) {
    'use strict';

    var Schema = mongoose.Schema;

    var mapperSchema = new Schema({
        name: String,
        maps: [{
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

        return queue().
        then(function() {
            var deferred = queue.defer();
            Mapper.findByIdAndUpdate(id, {
                $set: details
            }, deferred.makeNodeResolver());
        }).
        then(function(mapper) {
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


    function singleMap(obj, map) {

        var parts = map.split('.');
        var currentPointer = obj;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            currentPointer = currentPointer[part];
        }

        return currentPointer;

    }

    function map(obj, maps) {
        var mappedValues = {};
        for (var i = 0; i < maps.length; i++) {
            var _map = maps[i];

            var value = singleMap(obj, _map.source);
            mappedValues[_map.destination] = value;
        }

        return mappedValues;

    }

    module.exports = {
        Mapper: Mapper,
        getMappers: getMappers,
        getMapperById: getMapperById,
        saveMapper: saveMapper,
        createMapper: createMapper,
        deleteMapper: deleteMapper,
        map: map
    };
}(require('mongoose'), require('q')));
