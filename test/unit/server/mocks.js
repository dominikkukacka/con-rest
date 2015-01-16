// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiMocksScope(mongoose, queue, api, workflow) {
  'use strict';


  var apiCalls = [{
      _id: '545726928469e940235ce769',
      name: 'firstCall',
      url: 'http://test.one',
      method: 'GET',
      type: 'formData',
      data: {
        page: 2
      },
      headers: null
    }, {
      _id: '545726928469e940235ce770',
      name: 'queue call #1',
      url: 'http://httpbin.org/get',
      method: 'GET',
      headers: {
        referer: 'http://google.com'
      }
    }, {
      _id: '545726928469e940235ce772',
      name: 'queue call #3',
      url: 'http://httpbin.org/get',
      method: 'GET'
    }, {
      _id: '545726928469e940235ce771',
      name: 'queue call #2',
      url: 'http://httpbin.org/get',
      method: 'GET',
      headers: {
        'user-agent': 'TestUserAgent'
      }
    },

    {
      _id: '545726928469e940235ce800',
      name: 'data test #1',
      url: 'http://httpbin.org/post',
      method: 'POST',
      type: 'formData',
      data: {
        username: 'max',
        password: '123'
      }
    },

    {
      _id: '545726928469e940235ce900',
      name: 'data test #2',
      url: 'http://httpbin.org/post',
      method: 'POST',
      type: 'payload',
      data: {
        username: 'max',
        password: '123'
      }
    }
  ];

  var workflows = [{
    _id: '545726928469e940235ce769',
    name: 'firstWorkflow',
    calls: ['545726928469e940235ce769', '545726928469e940235ce770']
  }, {
    _id: '545726928469e940235ce700',
    name: 'secondWorkflow',
    calls: ['545726928469e940235ce770', '545726928469e940235ce771', '545726928469e940235ce772'],
    connectors: [{
      _id: '545726928469e940235d0001',
      source: '545726928469e940235ce770',
      destination: '545726928469e940235ce771',
      mapper: '5464b1e2f8243a3c321a0001'
    },{
      _id: '545726928469e940235d0002',
      source: '545726928469e940235ce771',
      destination: '545726928469e940235ce772',
      mapper: '5464b1e2f8243a3c321a0001'
    },{
      _id: '545726928469e940235d0003',
      source: '545726928469e940235ce770',
      destination: '545726928469e940235ce772',
      mapper: '5464b1e2f8243a3c321a0001'
    }]
  }];

  var workflowExecutions = [{
    _id: '5464b1e2f8243a3c32170001',
    workflow: '545726928469e940235ce700',
    executedAt: new Date(),
    executions: [
      '5464b1e2f8243a3c32180001',
      '5464b1e2f8243a3c32180002',
      '5464b1e2f8243a3c32180003'
    ]
  }];

  var executions = [
    // executed through workflow
    {
      _id: '5464b1e2f8243a3c32180001',
      workflow: '545726928469e940235ce700',
      apiCall: '545726928469e940235ce770',
      statusCode: 200,
      reponse: {
        indicator: 100
      }
    }, {
      _id: '5464b1e2f8243a3c32180002',
      workflow: '545726928469e940235ce700',
      apiCall: '545726928469e940235ce771',
      statusCode: 200,
      reponse: {
        indicator: 101
      }
    }, {
      _id: '5464b1e2f8243a3c32180003',
      workflow: '545726928469e940235ce700',
      apiCall: '545726928469e940235ce772',
      statusCode: 200,
      reponse: {
        indicator: 102
      }
    },

    // directly executed
    {
      _id: '5464b1e2f8243a3c32180004',
      apiCall: '545726928469e940235ce770',
      statusCode: 200,
      reponse: {
        indicator: 100
      }
    }

  ];

  var mappers = [
    // executed through workflow
    {
      _id: '5464b1e2f8243a3c321a0001',
      name: 'extractor for banana and userid',
      maps: [{
        source: 'user.id',
        destination: 'ba.na.na'
      }, {
        source: 'user.name',
        destination: 'userName'
      }]
    }
  ];

  function createMocks(model, mocks) {
    var allMocksCreated = queue.defer();
    var Model = mongoose.model(model);
    var allPromisses = [];

    for (var i = 0; i < mocks.length; i++) {
      var data = mocks[i];
      var deferred = queue.defer();
      Model.create(data, deferred.makeNodeResolver());
      allPromisses.push(deferred);
    }

    queue.all(allPromisses)
      .then(function resolve() {
        allMocksCreated.resolve();
      })
      .fail(function reject() {
        allMocksCreated.reject()
      });
    return allMocksCreated.promise;
  }


  function APIMocks(done) {
    var allMocks = [
      createMocks('APICall', apiCalls),
      createMocks('Workflow', workflows),
      createMocks('Execution', executions),
      createMocks('WorkflowExecution', workflowExecutions),
      createMocks('Mapper', mappers),
    ];

    queue.all(allMocks)
      .then(function itsDone() {
        done();
      })
      .catch(done);

  }


  module.exports = APIMocks;
}(require('mongoose'), require('q'), require('../../../server/api.js'), require('../../../server/workflow.js'),
  require('../../../server/mapper.js')));
