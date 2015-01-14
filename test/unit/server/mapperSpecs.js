// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(sinon, nock, _, expect, undefined) {
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
          call.maps.length.should.be.exactly(2);
          call.maps[1].source.should.equal('user.name');
          call.maps[1].destination.should.equal('userName');
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
              maps: [{
                source: 'test.data',
                destination: 'testData'
              }]
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
              maps: [{
                source: 'overwrittenSource',
                destination: 'overwrittenDestination'
              }]
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
          mapper.maps.length.should.be.exactly(1);
          mapper.maps[0].source.should.equal('overwrittenSource');
          mapper.maps[0].destination.should.equal('overwrittenDestination');
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

        describe('map', function mapScope() {
            it('should execute some maps', function testMap(done) {
                var testObject = {
                    ba: {
                        na: {
                            na: 1337
                        }
                    },
                    users: [{
                        id: 1,
                        name: 'Max',
                        groups: [{
                            name: 'admin'
                        }]
                    }, ],
                    testArray: [
                        'banan',
                        'apple', {
                            test: 'orange'
                        }
                    ],
                    arr: [
                        [
                            null,
                            [
                                'baz',
                                1338
                            ]
                        ]
                    ],
                    foobar: 123
                };

                var testMaps = [{
                    source: 'foobar',
                    destination: 'rootValue'
                }, {
                    source: 'ba.na',
                    destination: 'bananaObj'
                }, {
                    source: 'ba.na.na',
                    destination: 'bananaValue'
                }, {
                    source: 'testArray[1]',
                    destination: 'arrayValue'
                }, {
                    source: 'testArray[2].test',
                    destination: 'arrayObj'
                }, {
                    source: 'users[0].groups[0].name',
                    destination: 'complexString'
                }, {
                    source: 'users[0].groups',
                    destination: 'complexArray'
                }, {
                    source: 'arr[0][1][0]',
                    destination: 'arrayArray'
                }, {
                    source: 'users[0].email',
                    destination: 'noValue'
                }];

                var testOutput = {
                    rootValue: 123,
                    bananaObj: {
                        na: 1337
                    },
                    bananaValue: 1337,
                    arrayValue: 'apple',
                    arrayObj: 'orange',
                    complexString: 'admin',
                    complexArray: [{
                        name: 'admin'
                    }],
                    arrayArray: 'baz',
                    noValue: undefined
                };


        var result = mapper.map(testObject, testMaps);
        expect(result).to.deep.equal(testOutput);

        done();
      });
    });

  });
}(require('sinon'), require('nock'), require('underscore'), require('chai').expect));
