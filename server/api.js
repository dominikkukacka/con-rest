// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose, queue, request, _) {
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

    function executeAPICallById(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        return queue().
            then(function () {
                var deferred = queue.defer();
                APICall.findById(id, deferred.makeNodeResolver());
                return deferred.promise;
            }).then(function returnCall(call) {
                var deferred = queue.defer();
                queue().
                    then(executeAPICall(call)).
                    then(function (data) {
                        res.send(data);
                        deferred.resolve(data);
                    });

                return deferred.promise;
            });
    }

    function executeAPICall(apiCall) {
        return function () {
            var deferred = queue.defer();

            var headers = {
                'user-agent': 'con-rest'
            };

            if(apiCall.headers) {
                headers = _.extend(headers, apiCall.headers);
            }

            var data = apiCall.data || null;

            request({
                method: apiCall.method,
                url: apiCall.url,
                headers: headers,
                data: data
            }, function (err, response, body) {

                var parsedBody = null;
                try {
                    parsedBody = JSON.parse(body);
                } catch (e) {
                    parsedBody = body;
                }

                deferred.resolve({
                    id: apiCall._id,
                    statusCode: response.statusCode,
                    apiCall: apiCall,
                    response: parsedBody,
                    headers: headers,
                    data: data
                });
            });

            return deferred.promise;
        };
    }

    module.exports = {
        APICall: APICall,
        getAPICalls: getAPICalls,
        getAPICallById: getAPICallById,
        registerAPICall: registerAPICall,
        executeAPICall: executeAPICall,
        executeAPICallById: executeAPICallById
    };
}(require('mongoose'), require('q'), require('request'), require('underscore')));