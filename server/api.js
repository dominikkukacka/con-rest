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
        formData: Schema.Types.Mixed,
        payload: Schema.Types.Mixed,
        headers: Schema.Types.Mixed
    });

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

            var formData = apiCall.formData || null;

            // it takes either an JSON object or a string,
            // a JSON object will be stringified
            var payload = null;
            if(apiCall.payload) {
                try {
                    payload = JSON.stringify(apiCall.payload);
                } catch (e) {
                    payload = apiCall.payload;
                }
            }

            request({
                method: apiCall.method,
                url: apiCall.url,
                headers: headers,
                data: formData,
                body: payload
            }, function (err, response, body) {

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
                    id: apiCall._id,
                    statusCode: response.statusCode,
                    apiCall: apiCall,
                    response: parsedBody,
                    headers: headers,
                    payload: payload,
                    formData: formData
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
                apiCall: result.apiCall._id,
                statusCode: result.statusCode,
                response: result.response,
                headers: result.headers,
                formData: result.formData,
                payload: result.payload,
                executedAt: new Date()
            });

            execution.save(function resolveWithResult() {
                deferred.resolve(result);
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
        executeAPICallById: executeAPICallById,
        getExecutionsByAPICallId: getExecutionsByAPICallId
    };
}(require('mongoose'), require('q'), require('request'), require('underscore'), require('./execution')));