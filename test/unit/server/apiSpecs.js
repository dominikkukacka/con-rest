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
        var api;

        it('should connect and load the api module', function (done) {
            var dbOptions = {
                mocks: require(path.join(__dirname, 'apiMocks')),
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
                    api = require('../../../server/api');
                    api.should.be.ok;
                }).
                then(done).
                catch(done);
        });

        describe('retrieval of API calls', function retrievalScope() {
            it('should return the registered API calls', function getRegisteredAPICalls(done) {
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
        })

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
                                data: { ba: 'nana'},
                                headers: { he: 'ad'}
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
    });

}(require('sinon'), require('should')));