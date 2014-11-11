// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose, queue, api) {
    'use strict';

    var Schema = mongoose.Schema;

    var workflowSchema = new Schema({
        name: String,
        calls: [{type: Schema.Types.ObjectId, ref: 'APICall'}]
    });

    var Workflow = mongoose.model('Workflow', workflowSchema);
    var APICall = mongoose.model('APICall');

    function getWorkflows(req, res) {
        var deferred = queue.defer();
        Workflow.find(deferred.makeNodeResolver());
        deferred.promise.then(function returnResults(results) {
            res.send(results);
        });
        return deferred.promise;
    }

    function getWorkflowById(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        Workflow.findById(id, deferred.makeNodeResolver());
        deferred.promise.then(function returnCall(call) {
            res.send(call);
        });
        return deferred.promise;
    }

    function registerWorkflow(req, res) {
        var workflow = new Workflow(req.body);
        var deferred = queue.defer();
        workflow.save(deferred.makeNodeResolver());
        deferred.promise.then(function saveNewCall() {
            res.send(workflow.id);
        });
        return deferred.promise;
    }

    function saveWorkflow(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        var details = req.body;
        var workflow = null;
        return queue().
            then(function getExistingWorkflow() {
                var deferred = queue.defer();
                Workflow.findById(id, deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function modifyWorkflow(retrievedWorkflow) {
                var deferred = queue.defer();
                workflow = retrievedWorkflow;
                workflow.name = details.name;
                workflow.calls = details.calls;
                workflow.save(deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function returnTrue() {
                var deferred = queue.defer();
                deferred.resolve(workflow);
                res.send('ok');
                return deferred.promise;
            });
    }

    function executeWorkflow(req, res) {
        var deferred = queue.defer();
        var id = mongoose.Types.ObjectId(req.params.id);
        // Workflow.findById(id).exec().then(function(){
        // }).exec(deferred.makeNodeResolver());
        // deferred.promise.then(function returnCall(call) {
        //     res.send(call);
        // });

        var workflow = null;


        return queue().
            then(function getWorkflow() {
                var deferred = queue.defer();
                Workflow.findById(id, deferred.makeNodeResolver());
                return deferred.promise;
            }).
            then(function getCalls(retrievedWorkflow) {
                var deferred = queue.defer();
                workflow = retrievedWorkflow;

                APICall.find({
                    _id: {$in: workflow.calls}
                }).exec(deferred.makeNodeResolver());

                return deferred.promise;
            }).
            then(function mergeAndReturn(retrievedCalls) {
                var deferred = queue.defer();

                var callResults = {};

                var apiCallQueue = queue();
                for (var i = 0; i < retrievedCalls.length; i++) {
                    var call = retrievedCalls[i];

                    apiCallQueue = apiCallQueue.
                        then(api.executeAPICall(call)).
                        then(function(data) {
                            callResults[data.id] = data;
                        });
                };

                apiCallQueue.then(function(endResult) {
                    deferred.resolve(callResults)
                });

                return deferred.promise;
            }).
            then(function results(data) {
                res.send(data);
                return data;
            });

    }

    module.exports = {
        getWorkflows: getWorkflows,
        getWorkflowById: getWorkflowById,
        registerWorkflow: registerWorkflow,
        saveWorkflow: saveWorkflow,
        executeWorkflow: executeWorkflow
    };
}(require('mongoose'), require('q'), require('./api.js')));