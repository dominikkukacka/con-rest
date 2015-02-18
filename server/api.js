// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose, queue, request, _, Execution, APICall, execution, config) {
  'use strict';

  var PAYLOAD = 'payload';
  var FORM_DATA = 'formData';

  var helper = require('./serverHelper');

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
    return helper.getAll(APICall, req, res, function(data) {
      // set file to true if buffer is set, to keep json small
      for(var i = 0; i < data.length; i++) {
        data[i].file = !!data[i].file.buffer;
      }
      return data;
    });
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
    return helper.getById(APICall, req, res, function(data) {
      // set file to true if buffer is set, to keep json small
      data.file = !!data.file.buffer;
      return data;
    });
  }

  // Delete specific REST call from database by its ID
  // Response is "Status: 200 OK" and "deleted" in body
  function deleteAPICall(req, res) {
    return helper.deleteById(APICall, req, res);
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
    return helper.getById(APICall, req, res);
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
    return helper.createAndReturnId(APICall, req, res);
  }

  function saveAPICall(req, res) {
    return helper.updateById(APICall, req, res);
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
    return APICall.findById(id)
      .exec()
      .then(function returnCall(call) {
        return executeAPICall(call);
      })
      .then(saveExecution)
      .then(function(data) {
        res.send(data);
        return data;
      }, function error(err) {
        res.status(500).send(err.toString());
        throw err;
      });
  }

  // generates the `header` object to be sent with every request.
  // it will add the user specified headers to the default headers
  function getHeaders(headers) {
    var defaultHeaders = {
      'user-agent': 'con-rest'
    };

    if (headers) {
      defaultHeaders = _.extend(defaultHeaders, headers);
    }

    return defaultHeaders;
  }

  // generates the complete `options` object for the request
  function getOptions(apiCall) {
    var headers = getHeaders(apiCall.headers);

    var options = {
      method: apiCall.method,
      url: apiCall.url,
      headers: headers,
      agentOptions: {
        ca: config.getCertificates()
      },
      strictSSL: config.getSSLConfig()
    };

    var type = apiCall.type || null;
    var data = apiCall.data || null;

    // these two are for saving the execution to the database
    options.type = type;
    options.data = data;

    if (data && type === PAYLOAD) {
      // *PAYLOAD* will go into the `body` of the request
      try {
        // when we are handling *PAYLOAD* data then we will try to stringify the data
        // e.g. converting the internal js object to an json string
        options.body = JSON.stringify(data);
        options.json = true;
      } catch (e) {
        // if the stringify fails we are just taking the string provided from mongo
        options.body = data;
      }
    } else if (type === FORM_DATA) {
      // *FORM_DATA* will go into the `formData` of the request
      options.formData = data;
    }

    return options;
  }

  // Executes REST call from database
  function executeAPICall(apiCall) {
    var deferred = queue.defer();
    var options = getOptions(apiCall);
    request(options, function(err, response, body) {
      if (err) {
        deferred.reject(err);
        return;
      }

      var parsedBody = null;
      try {
        // if the response body is json we try to parse it an put the object into the db
        parsedBody = JSON.parse(body);
      } catch (e) {
        // otherwise a string of it will be saved
        parsedBody = body;
      }

      deferred.resolve({
        statusCode: response.statusCode,
        apiCall: apiCall,
        url: apiCall.url,
        response: parsedBody,
        headers: options.headers,
        type: options.type,
        data: options.data
      });
    });
    return deferred.promise;
  }

  // Saves result of REST call execution in database
  function saveExecution(result) {
    // this execution comes from direct execution of a request
    // so workflow will be null
    return Execution.create({
        workflow: null,
        apiCall: result.apiCall,
        statusCode: result.statusCode,
        response: result.response,
        headers: result.headers,
        type: result.type,
        data: result.data,
        executedAt: new Date()
      })
      .then(function resolveWithResult(data) {
        var returnData = data.toObject();
        returnData.apiCall = result.apiCall;
        return returnData;
      });
  }

  function getAPICallImageById(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return APICall.findById(id)
      .exec()
      .then(function(data) {
        res.type(data.file.mime);
        res.end(data.file.buffer, "binary");
      }, function(err) {
        res.send(500, err);
      });

  }

  module.exports = {
    deleteAPICall: deleteAPICall,
    saveAPICall: saveAPICall,
    getAPICalls: getAPICalls,
    getAPICallById: getAPICallById,
    registerAPICall: registerAPICall,
    executeAPICall: executeAPICall,
    executeAPICallById: executeAPICallById,
    getExecutionsByAPICallId: getExecutionsByAPICallId,
    getAPICallImageById: getAPICallImageById
  };
}(
  require('mongoose'),
  require('q'),
  require('request'),
  require('underscore'),
  require('./resources/Execution'),
  require('./resources/APICall'),
  require('./execution'),
  require('./getConfig.js')
));
