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
    var mapper = require('../../../server/mapper');

    var Mapper = mongoose.model('Mapper');


    describe('con-rest mapper', function conRestServerScope() {

        beforeEach(function resetMongo(done) {
            mockgoose.reset();
            require(path.join(__dirname, 'mocks'))(done);
        });

        describe('retrieval of Mappers', function retrievalScope() {
            it('should return all the registered mappers', function getRegisteredWorkflows(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {};
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return mapper.getMappers(req, res);
                    }).
                    then(function then(mappers) {
                        mappers.length.should.be.above(0);
                        res.send.args[0][0].length.should.be.above(0);
                    }).
                    then(done).
                    catch(done);
            });

            it('should return a mapper based on id', function getRegisteredWorkflowById(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            params: {
                                id: '5464b1e2f8243a3c321a0001'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return mapper.getMapperById(req, res);
                    }).
                    then(function then() {
                        var call = res.send.args[0][0];
                        call.name.should.be.exactly('extractor for banana and userid');
                        call.map.length.should.be.exactly(2);
                        call.map[1].source.should.equal('user.name');
                        call.map[1].destination.should.equal('userName');
                    }).
                    then(done).
                    catch(done);
            });
        });

        describe('saving', function registrationScope() {
            it('should register an new mapper', function registerMapper(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            body: {
                                name: 'fake mapper',
                                map: [
                                    {
                                        source: 'test.data',
                                        destination: 'testData'
                                    }
                                ]
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return mapper.createMapper(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(done).
                    catch(done);
            });

            it('should overwrite an existing mapper', function saveExistingWorkflow(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            body: {
                                name: 'overwritten',
                                map: [
                                    {
                                        source: 'overwrittenSource',
                                        destination: 'overwrittenDestination'
                                    }
                                ]
                            },
                            params: {
                                id: '5464b1e2f8243a3c321a0001'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return mapper.saveMapper(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(function when() {
                        return mapper.getMapperById(req);
                    }).
                    then(function then(mapper) {
                        mapper.name.should.be.exactly('overwritten');
                        mapper.map.length.should.be.exactly(1);
                        mapper.map[0].source.should.equal('overwrittenSource');
                        mapper.map[0].destination.should.equal('overwrittenDestination');
                    }).
                    then(done).
                    catch(done);
            });
        });

        describe('deletion', function detionScope() {
            it('should delete an existing mapper', function saveExistingMapper(done) {
                var req;
                var res;
                queue().
                    then(function given() {
                        req = {
                            params: {
                                id: '5464b1e2f8243a3c321a0001'
                            }
                        };
                        res = {};
                        res.send = sinon.spy();
                    }).
                    then(function when() {
                        return mapper.deleteMapper(req, res);
                    }).
                    then(function then() {
                        res.send.calledOnce.should.be.true;
                        res.send.args[0][0].should.be.a.String;
                    }).
                    then(function when() {
                        return mapper.getMapperById(req);
                    }).
                    then(function then(mapper) {
                        (mapper === null).should.be.true;
                    }).
                    then(done).
                    catch(done);
            });
        });

    });

}(require('sinon'), require('nock')));