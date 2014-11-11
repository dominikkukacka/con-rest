// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose, queue, request) {
    'use strict';

    var Schema = mongoose.Schema;

    var apiCallSchema = new Schema({
        name: String,
        url: String,
        method: String,
        data: Schema.Types.Mixed,
        headers: Schema.Types.Mixed
    });

    var APICall = mongoose.model('APICall', apiCallSchema);

    function getAPICalls(req, res) {
        var deferred = queue.defer();
        APICall.find(deferred.makeNodeResolver());
        deferred.promise.then(function returnResults(results) {
            res.send(results);
        });
        return deferred.promise;
    }

    function getAPICallById(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        APICall.findById(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnCall(call) {
            res.send(call);
        });
        return deferred.promise;
    }

    function registerAPICall(req, res) {
        var apiCall = new APICall(req.body);
        var deferred = queue.defer();
        apiCall.save(deferred.makeNodeResolver());
        deferred.promise.then(function saveNewCall() {
            res.send(apiCall.id);
        });
        return deferred.promise;
    }

    function execute(req, res) {

    }

    function executeAPICall(apiCall) {
        return function() {
            var deferred = queue.defer();

            request({
                url: apiCall.url,
            }, function(err,response, body) {
                var data = JSON.parse(body);
                deferred.resolve({
                    id: apiCall._id,
                    data: data
                });
            });

            return deferred.promise;
        }
    }

    module.exports = {
        APICall: APICall,
        getAPICalls: getAPICalls,
        getAPICallById: getAPICallById,
        registerAPICall: registerAPICall,
        executeAPICall: executeAPICall
    };
}(require('mongoose'), require('q'), require('request')));