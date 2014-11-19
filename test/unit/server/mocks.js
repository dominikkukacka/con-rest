// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiMocksScope(mongoose, api, workflow) {
    'use strict';


    var apiCalls = [
        {
            _id: '545726928469e940235ce769',
            name: 'firstCall',
            url: 'http://test.one',
            method: 'GET',
            data: {
                page: 2
            },
            headers: null
        },{
            _id: '545726928469e940235ce770',
            name: 'queue call #1',
            url: 'http://httpbin.org/get',
            method: 'GET',
            headers: {
                referer: 'http://google.com'
            }
        },{
            _id: '545726928469e940235ce772',
            name: 'queue call #3',
            url: 'http://httpbin.org/get',
            method: 'GET'
        },{
            _id: '545726928469e940235ce771',
            name: 'queue call #2',
            url: 'http://httpbin.org/get',
            method: 'GET',
            headers: {
                'user-agent': 'TestUserAgent'
            }
        }
    ];

    var workflows = [
        {
            _id: '545726928469e940235ce769',
            name: 'firstWorkflow',
            calls: ['545726928469e940235ce769', '545726928469e940235ce770']
        },
        {
            _id: '545726928469e940235ce700',
            name: 'secondWorkflow',
            calls: ['545726928469e940235ce770', '545726928469e940235ce771', '545726928469e940235ce772']
        }
    ];

    var workflowExecutions = [
        {
            _id: '5464b1e2f8243a3c32170001',
            workflow: '545726928469e940235ce700',
            executedAt: new Date(),
            executions: [
                '5464b1e2f8243a3c32180001',
                '5464b1e2f8243a3c32180002',
                '5464b1e2f8243a3c32180003'
            ]
        }
    ];

    var executions = [
        // executed through workflow
        {
            _id: '5464b1e2f8243a3c32180001',
            workflow: '545726928469e940235ce700',
            apiCall: '545726928469e940235ce770',
            statusCode: 200,
            reponse: {indicator: 100}
        },
        {
            _id: '5464b1e2f8243a3c32180002',
            workflow: '545726928469e940235ce700',
            apiCall: '545726928469e940235ce771',
            statusCode: 200,
            reponse: {indicator: 101}
        },
        {
            _id: '5464b1e2f8243a3c32180003',
            workflow: '545726928469e940235ce700',
            apiCall: '545726928469e940235ce772',
            statusCode: 200,
            reponse: {indicator: 102}
        },

        // directly executed
        {
            _id: '5464b1e2f8243a3c32180004',
            apiCall: '545726928469e940235ce770',
            statusCode: 200,
            reponse: {indicator: 100}
        }

    ];


    function APIMocks(done) {

        var APICall = mongoose.model('APICall');
        var Workflow = mongoose.model('Workflow');
        var Execution = mongoose.model('Execution');
        var WorkflowExecution = mongoose.model('WorkflowExecution');

        var promisedInserts =
            apiCalls.length +
            workflows.length +
            executions.length +
            workflowExecutions.length;

        var executedInserts = 0;
        var executedDone = false;

        function finish() {
            if(!executedDone && executedInserts >= promisedInserts) {
                executedDone = true;
                done();
            }
        }

        for (var i = 0; i < apiCalls.length; i++) {
            var data = apiCalls[i];
            APICall.create(data, function(err, model) {
                executedInserts++;
                finish(err);
            });
        };

        for (var i = 0; i < workflows.length; i++) {
            var data = workflows[i];
            Workflow.create(data, function(err, model) {
                executedInserts++;
                finish(err);
            });
        };

        for (var i = 0; i < executions.length; i++) {
            var data = executions[i];
            Execution.create(data, function(err, model) {
                executedInserts++;
                finish(err);
            });
        };

        for (var i = 0; i < workflowExecutions.length; i++) {
            var data = workflowExecutions[i];
            WorkflowExecution.create(data, function(err, model) {
                executedInserts++;
                finish(err);
            });
        };

    }


    module.exports = APIMocks;
}(require('mongoose'), require('../../../server/api.js'), require('../../../server/workflow.js')));
