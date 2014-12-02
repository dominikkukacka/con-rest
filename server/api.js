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
        type: String,
        data: Schema.Types.Mixed,
        headers: Schema.Types.Mixed
    });

    var PAYLOAD = 'payload';
    var FORM_DATA = 'formData';

    var APICall = mongoose.model('APICall', apiCallSchema);

    var Execution = mongoose.model('Execution');

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

    function deleteAPICall(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        APICall.findByIdAndRemove(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnDeleted() {
            res.send('deleted');
        });
        return deferred.promise;
    }

    function getExecutionsByAPICallId(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        Execution.
            find({
                apiCall: id
            }).
            exec(deferred.makeNodeResolver());

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
                    then(saveExecution()).
                    then(function (data) {
                        res.send(data);
                        deferred.resolve(data);
                    }).
                    fail(function error(err) {
                        res.status(500).send(err);
                        deferred.reject(err);
                    }).
                    catch(function error(err) {
                        res.status(500).send(err);
                        deferred.reject(err);
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

            if (apiCall.headers) {
                headers = _.extend(headers, apiCall.headers);
            }

            var options = {
                method: apiCall.method,
                url: apiCall.url,
                headers: headers
            };

            var type = apiCall.type || null;
            var data = apiCall.data || null;

            if (data) {
                if (type === PAYLOAD) {
                    try {
                        options.body = JSON.stringify(data);
                        options.json = true;
                    } catch (e) {
                        options.body = data;
                    }
                } else if (type === FORM_DATA) {
                    options.formData = data;
                }
            }

            request(options, function (err, response, body) {
                if (err) {
                    deferred.reject(err);
                    return;
                }

                var parsedBody = null;
                try {
                    parsedBody = JSON.parse(body);
                } catch (e) {
                    parsedBody = body;
                }

                deferred.resolve({
                    statusCode: response.statusCode,
                    apiCall: apiCall,
                    response: parsedBody,
                    headers: headers,
                    type: type,
                    data: data
                });
            });

            return deferred.promise;
        };
    }

    function saveExecution() {
        return function saveExecution(result) {
            var deferred = queue.defer();

            var execution = new Execution({
                workflow: null,
                apiCall: result.apiCall,
                statusCode: result.statusCode,
                response: result.response,
                headers: result.headers,
                type: result.type,
                data: result.data,
                executedAt: new Date()
            });

            execution.save(function resolveWithResult(err, data) {
                var returnData = _.clone(data);
                returnData.apiCall = result.apiCall;
                deferred.resolve(returnData);
            });
            return deferred.promise;
        };
    }

    module.exports = {
        deleteAPICall: deleteAPICall,
        APICall: APICall,
        getAPICalls: getAPICalls,
        getAPICallById: getAPICallById,
        registerAPICall: registerAPICall,
        executeAPICall: executeAPICall,
        executeAPICallById: executeAPICallById,
        getExecutionsByAPICallId: getExecutionsByAPICallId
    };
}(require('mongoose'), require('q'), require('request'), require('underscore'), require('./execution')));