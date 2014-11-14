// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowExecutionSpecScope(sinon, nock) {
    'use strict';

    var mockgoose = require('mockgoose');
    var mongoose = require('mongoose');

    mockgoose(mongoose);


    var queue = require('q');
    var path = require('path');
    var workflowExecution = require('../../../server/workflowExecution');


    describe('con-rest workflowExecution', function conRestworkflowExecutionScope() {

        beforeEach(function resetMongo(done) {
            mockgoose.reset();
            require(path.join(__dirname, 'mocks'))(done);
        });

        describe('retrieval of workflowExecutions', function retrievalScope() {
            it('should return all the registered workflowExecutions', function getRegisteredworkflowExecutions(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {};
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflowExecution.getWorkflowExecutions(req, res);
                    }).
                    then(function then(workflowExecutions) {
                        var call = res.send.args[0][0];
                        workflowExecutions.length.should.be.above(0);
                        res.send.args[0][0].length.should.be.above(0);
                    }).
                    then(done).
                    catch(done);
            });

            it('should return a workflowExecution based on id', function getRegisteredworkflowExecutionById(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            params: {
                                id: '5464b1e2f8243a3c32170001'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return workflowExecution.getWorkflowExecutionById(req, res);
                    }).
                    then(function then() {
                        var call = res.send.args[0][0];
                        call.id.should.be.exactly('5464b1e2f8243a3c32170001');
                        call.executions.length.should.be.exactly(3);
                    }).
                    then(done).
                    catch(done);
            });
        });

        xdescribe('saving', function registrationScope() {
            it('should register an new workflowExecution', function registerworkflowExecution(done) {
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
                        return workflowExecution.registerworkflowExecution(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(done).
                    catch(done);
            });

            it('should overwrite an existing workflowExecution', function saveExistingworkflowExecution(done) {
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
                        return workflowExecution.saveworkflowExecution(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(function when() {
                        return workflowExecution.getworkflowExecutionById(req);
                    }).
                    then(function then(workflowExecution) {
                        workflowExecution.name.should.be.exactly('overwritten');
                    }).
                    then(done).
                    catch(done);
            });
        });
    });

}(require('sinon'), require('nock')));