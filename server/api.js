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

    // Receive all stored REST calls from the database.
    // Response is "Status: 200 OK" and an array of JSON objects. Response example:

    //     [{
    //         "_id":"547874b2281a1fbc22e2284b",
    //         "name":"sampleRestCall",
    //         "url":"http://this.sample.call",
    //         "method":"POST",
    //         "type":"formData",
    //         "data":"{\n\"sampleParam\":\"sampleValue\",\n\"testParam\":\"2\"\n}",
    //         "headers":"{\n\"sampleAuthorization\":\"sampleValue\"\n}",
    //         "__v":0
    //     }]
    function getAPICalls(req, res) {
        var deferred = queue.defer();
        APICall.find(deferred.makeNodeResolver());
        deferred.promise.then(function returnResults(results) {
            res.send(results);
        });
        return deferred.promise;
    }

    // Receive specific REST call from the database by its ID
    // Response is "Status: 200 OK" and a JSON object. Response example:

    //     {
    //         "_id":"547874b2281a1fbc22e2284b",
    //         "name":"sampleRestCall",
    //         "url":"http://this.sample.call",
    //         "method":"POST",
    //         "type":"formData",
    //         "data":"{\n\"sampleParam\":\"sampleValue\",\n\"testParam\":\"2\"\n}",
    //         "headers":"{\n\"sampleAuthorization\":\"sampleValue\"\n}",
    //         "__v":0
    //     }
    function getAPICallById(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        APICall.findById(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnCall(call) {
            res.send(call);
        });
        return deferred.promise;
    }

    // Delete specific REST call from database by its ID
    // Response is "Status: 200 OK" and "deleted" in body
    function deleteAPICall(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        APICall.findByIdAndRemove(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnDeleted() {
            res.send('deleted');
        });
        return deferred.promise;
    }

    // Receive all executions of a specific REST call by its ID
    // Response is "Status: 200 OK" and an array of JSON objects. Sample response:

    //     [{
    //         "_id": "547d9969c48ab5b029856df6",
    //         "workflow": null,
    //         "apiCall": "547874b2281a1fbc22e2284b",
    //         "statusCode":200,
    //         "response": {
    //             "sampleResponse": "sampleValue",
    //             "sampleReference": "anotherValue"
    //         },
    //         "headers": {
    //             "user-agent": "con-rest",
    //             "sampleAuthorization": "sampleValue"
    //         },
    //         "executedAt": "2014-12-02T13:30:55.955Z",
    //         "__v":0
    //     }]
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

    // Add new REST call to the database and receive its ID
    // Response is "Status: 200 OK" and an ID in the body. Request example:

    //     {
    //         "name": "newSampleRestCall",
    //         "url": "http://new.sample.api/call",
    //         "method": "POST",
    //         "headers": {
    //             "sampleAuthorization":"sampleValue" },
    //         "type":"payload",
    //         "data": {
    //             "sampleParam":"sampleValue",
    //             "testParam":2 }
    //     }
    function registerAPICall(req, res) {
        var apiCall = new APICall(req.body);
        var deferred = queue.defer();
        apiCall.save(deferred.makeNodeResolver());
        deferred.promise.then(function saveNewCall() {
            res.send(apiCall.id);
        });
        return deferred.promise;
    }

    function saveAPICall(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        var details = req.body;
        var apiCall = null;
        return queue().
            then(function getExistingAPICall() {
                var deferred = queue.defer();
                APICall.findById(id, deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function modifyAPICall(retrievedAPICall) {
                var deferred = queue.defer();
                apiCall = retrievedAPICall;
                apiCall.name = details.name;
                apiCall.url = details.url;
                apiCall.method = details.method;
                apiCall.type = details.type;
                apiCall.data = details.data;
                apiCall.headers = details.headers;
                apiCall.save(deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function returnTrue() {
                var deferred = queue.defer();
                deferred.resolve(apiCall);
                res.send('ok');
                return deferred.promise;
            });
    }

    // Execute a REST call from the database using its ID
    // Response is "Status: 200 OK" and a JSON body. Response Example:

    //     {
    //         "_id": "547d9969c48ab5b029856df6",
    //         "statusCode": 200,
    //         "apiCall": {
    //             "_id":"547874b2281a1fbc22e2284b",
    //             "name": "newSampleRestCall",
    //             "url": "http://new.sample.api/call",
    //             "method": "POST",
    //             "headers": {
    //                 "sampleAuthorization":"sampleValue"
    //             }
    //             "type":"payload",
    //             "data": {
    //                 "sampleParam":"sampleValue",
    //                 "testParam":2
    //             }
    //         },
    //         "response": {
    //             "sampleResponse": "sampleValue",
    //             "sampleReference": "anotherValue"
    //         },
    //         "headers": {
    //             "user-agent": "con-rest",
    //             "sampleAuthorization": "sampleValue"
    //         },
    //         "type": "payload",
    //         "data": {
    //             "sampleParam":"sampleValue",
    //             "testParam":2
    //         }
    //     }
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

    // Executes REST call from database
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

    // Saves result of REST call execution in database
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
        saveAPICall: saveAPICall,
        APICall: APICall,
        getAPICalls: getAPICalls,
        getAPICallById: getAPICallById,
        registerAPICall: registerAPICall,
        executeAPICall: executeAPICall,
        executeAPICallById: executeAPICallById,
        getExecutionsByAPICallId: getExecutionsByAPICallId
    };
}(require('mongoose'), require('q'), require('request'), require('underscore'), require('./execution')));