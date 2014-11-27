// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(sinon, nock) {
    'use strict';

    var mockgoose = require('mockgoose');
    var mongoose = require('mongoose');

    mockgoose(mongoose);


    var queue = require('q');
    var path = require('path');
    var workflow = require('../../../server/workflow');

    var Execution = mongoose.model('Execution');
    var WorkflowExecution = mongoose.model('WorkflowExecution');


    describe('con-rest server', function conRestServerScope() {

        beforeEach(function resetMongo(done) {
            mockgoose.reset();
            require(path.join(__dirname, 'mocks'))(done);
        });

        describe('retrieval of Workflows', function retrievalScope() {
            it('should return all the registered workflows', function getRegisteredWorkflows(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {};
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflow.getWorkflows(req, res);
                    }).
                    then(function then(workflows) {
                        workflows.length.should.be.above(0);
                        res.send.args[0][0].length.should.be.above(0);
                    }).
                    then(done).
                    catch(done);
            });

            it('should return a workflow based on id', function getRegisteredWorkflowById(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            params: {
                                id: '545726928469e940235ce769'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflow.getWorkflowById(req, res);
                    }).
                    then(function then() {
                        var call = res.send.args[0][0];
                        call.name.should.be.exactly('firstWorkflow');
                        call.calls.length.should.be.exactly(2);
                    }).
                    then(done).
                    catch(done);
            });
        });

        describe('saving', function registrationScope() {
            it('should register an new workflow', function registerWorkflow(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            body: {
                                name: 'fakeCall',
                                calls: ['545726927732d940235ce769', '545726928469e940235ce770']
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflow.registerWorkflow(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(done).
                    catch(done);
            });

            it('should overwrite an existing workflow', function saveExistingWorkflow(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            body: {
                                name: 'overwritten',
                                calls: ['545726928469e940235ce769', '545726928469e940235ce770']
                            },
                            params: {
                                id: '545726928469e940235ce769'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflow.saveWorkflow(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(function when() {
                        return workflow.getWorkflowById(req);
                    }).
                    then(function then(workflow) {
                        workflow.name.should.be.exactly('overwritten');
                    }).
                    then(done).
                    catch(done);
            });
        });

        describe('deletion', function detionScope() {
            it('should delete an existing workflow', function saveExistingWorkflow(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            params: {
                                id: '545726928469e940235ce769'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflow.deleteWorkflow(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(function when() {
                        return workflow.getWorkflowById(req);
                    }).
                    then(function then(workflow) {
                        (workflow === null).should.be.true;
                    }).
                    then(done).
                    catch(done);
            });
        });

        describe('execution of Workflows', function retrievalScope() {
            it('should execute a workflow', function getRegisteredWorkflows(done) {

                for (var i = 0; i <= 2; i++) {
                    nock('http://httpbin.org').
                        get('/get').
                        reply(200, {indicator: 100 + i});
                }

                var req;
                var res;
                var startCount = 0;
                queue().
                    then(function given() {
                        req = {
                            params: {
                                id: '545726928469e940235ce700'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function () {
                        return Execution.count().exec();
                    }).
                    then(function when(count) {
                        startCount = count;
                        return workflow.executeWorkflowById(req, res);
                    }).
                    then(function then() {

                        var call = res.send.args[0][0];
                        Object.keys(call).length.should.be.exactly(3);
                        String(call[0].apiCall).should.be.exactly('545726928469e940235ce770');
                        String(call[1].apiCall).should.be.exactly('545726928469e940235ce771');
                        String(call[2].apiCall).should.be.exactly('545726928469e940235ce772');

                        Object.keys(call[0].response).length.should.be.exactly(1);
                        call[0].response.indicator.should.be.exactly(100);

                        Object.keys(call[1].response).length.should.be.exactly(1);
                        call[1].response.indicator.should.be.exactly(101);

                        Object.keys(call[2].response).length.should.be.exactly(1);
                        call[2].response.indicator.should.be.exactly(102);

                        // Check Mongo if three executions inserted
                        Execution.count().exec(function (err, endCount) {
                            endCount.should.be.exactly(startCount + 3);
                        });

                    }).
                    then(done).
                    catch(done);
            });
        });
    });

}(require('sinon'), require('nock')));