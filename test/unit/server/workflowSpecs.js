// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(sinon) {
    'use strict';

    describe('con-rest server', function conRestServerScope() {

        require('monckoose');
        var mongoose = require('mongoose');
        var queue = require('q');
        var path = require('path');
        var workflow;

        it('should connect and load the workflow module', function (done) {
            var dbOptions = {
                mocks: require(path.join(__dirname, 'mocks')),
                debug: false
            };
            queue().
                then(function () {
                    var deferred = queue.defer();
                    if (mongoose.connection.readyState) {
                        deferred.resolve();
                    } else {
                        mongoose.connect('mongodb://localhost/mocks', dbOptions, deferred.makeNodeResolver());
                    }
                    return deferred.promise;
                }).
                then(function () {
                    mongoose.connection.readyState.should.be.ok;
                    workflow = require('../../../server/workflow');
                    workflow.should.be.ok;
                }).
                then(done).
                catch(done);
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
                                calls: ['545726927732d940235ce769', '545726927732d940235ce123']
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
                                calls: ['545c8129e0e00d50095212c5', '545c8139e0e00d50095212c6']
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
    });

}(require('sinon'), require('should')));