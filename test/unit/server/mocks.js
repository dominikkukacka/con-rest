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
            method: 'GET'
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




    function APIMocks(done) {

        var APICall = mongoose.model('APICall');
        var Workflow = mongoose.model('Workflow');

        var promisedInserts = apiCalls.length + workflows.length;
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

    }


    module.exports = APIMocks;
}(require('mongoose'), require('../../../server/api.js'), require('../../../server/workflow.js')));
