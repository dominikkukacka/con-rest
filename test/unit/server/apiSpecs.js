// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(sinon, should, api, nock) {
  'use strict';

  describe('con-rest server', function conRestServerScope() {

    var mongoose = require('mongoose');
    var mockgoose = require('mockgoose');

    var queue = require('q');
    var path = require('path');
    var api = require('../../../server/api');

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    afterEach(function resetNock(done) {
      nock.cleanAll();
      done();
    });

    describe('retrieval of API calls', function retrievalScope() {
      it('should return all the registered API calls', function getRegisteredAPICalls(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {};
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return api.getAPICalls(req, res);
        }).
        then(function then(apis) {
          apis.length.should.be.above(0);
          res.send.args[0][0].length.should.be.above(0);
        }).
        then(done).
        catch(done);
      });

      it('should return a API call based on id', function getRegisteredAPICallById(done) {
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
          return api.getAPICallById(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          call.name.should.be.exactly('firstCall');
          call.url.should.be.exactly('http://test.one');
          call.method.should.be.exactly('GET');
          call.data.page.should.be.exactly(2);
        }).
        then(done).
        catch(done);
      });

      it('should find apis based on name', function findApiWithName(done) {
        var req;
        var res;
        queue()
          .then(function given() {
            req = {
              query: {
                search: 'data test'
              }
            };
            res = {
              send: sinon.spy()
            };
          })
          .then(function when() {
            return api.searchByName(req, res);
          })
          .then(function then(apis) {
            var calls = res.send.args[0][0];
            calls.should.be.exactly(apis);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('registration', function registrationScope() {
      it('should register an new API call', function registerApiCall(done) {
        var req;
        var res;
        queue().
        then(function given() {
          req = {
            body: {
              name: 'fakeCall',
              url: 'fakeUrl',
              method: 'GET',
              data: {
                ba: 'nana'
              },
              headers: {
                he: 'ad'
              }
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return api.registerAPICall(req, res);
        }).
        then(function then() {
          res.send.calledOnce.should.be.true;
          res.send.args[0][0].should.be.a.String;
        }).
        then(done).
        catch(done);
      });
    });

    describe('execution', function retrievalScope() {
      it('should execute a successful API call', function executeAPICall(done) {
        nock('http://httpbin.org').
        get('/get').
        reply(200, {
          index: 100
        });

        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              id: '545726928469e940235ce770'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return api.executeAPICallById(req, res);
        }).
        then(function then() {
          var execution = res.send.args[0][0];
          execution.statusCode.should.be.exactly(200);
          String(execution.apiCall._id).should.be.exactly('545726928469e940235ce770');
          Object.keys(execution.response).length.should.be.exactly(1);
          execution.response.index.should.be.exactly(100);
        }).
        then(done).
        catch(done);
      });

      it('should execute a not successful API call', function executeAPICall(done) {


        nock('http://httpbin.org').
        get('/get').
        reply(500);

        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              id: '545726928469e940235ce770'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return api.executeAPICallById(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          call.statusCode.should.be.exactly(500);
        }).
        then(done).
        catch(done);
      });

      it('should execute API call with postForm data', function executeAPICallWithData(done) {

        nock('http://httpbin.org').
        post('/post').
        reply(200, function(url, data) {
          data.should.containEql('Content-Disposition: form-data');
          data.should.containEql('name="password"');
          data.should.containEql('name="username"');
          data.should.containEql('123');
          data.should.containEql('max');
          return {
            index: 111
          };
        });


        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              id: '545726928469e940235ce800'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return api.executeAPICallById(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          call.statusCode.should.be.exactly(200);
          Object.keys(call.response).length.should.be.exactly(1);
          call.response.index.should.be.exactly(111);
        }).
        then(done).
        catch(done);


      });

      it('should execute API call with payload data', function executeAPICallWithData(done) {

        nock('http://httpbin.org').
        post('/post').
        reply(200, function(url, data) {
          var data = JSON.parse(data);
          data.should.containEql({
            password: '123',
            username: 'max'
          });
          return {
            index: 200
          };
        });

        var req;
        var res;
        queue().
        then(function given() {
          req = {
            params: {
              id: '545726928469e940235ce900'
            }
          };
          res = {};
          res.send = sinon.spy();
        }).
        then(function when() {
          return api.executeAPICallById(req, res);
        }).
        then(function then() {
          var call = res.send.args[0][0];
          call.statusCode.should.be.exactly(200);
          Object.keys(call.response).length.should.be.exactly(1);
          call.response.index.should.be.exactly(200);
        }).
        then(done).
        catch(done);
      });
    });
  });

}(
  require('sinon'),
  require('should'),
  require('../../../server/api'),
  require('nock')
));
