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
    ;


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

        describe('execution of Workflows', function retrievalScope() {
            it('should return execute a workflow', function getRegisteredWorkflows(done) {

                nock('http://httpbin.org').
                    get('/get').
                    times(3).
                    reply(200, {foo: 'bar'});

                var req;
                var res;
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
                    then(function when() {
                        return workflow.executeWorkflow(req, res);
                    }).
                    then(function then() {
                        var call = res.send.args[0][0];
                        Object.keys(call).length.should.be.exactly(3)
                    }).
                    then(done).
                    catch(done);
            });
        });
    });

}(require('sinon'), require('nock')));