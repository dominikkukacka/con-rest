// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(api, sinon) {
    'use strict';

    describe('con-rest server', function conRestServerScope() {
        describe('registration', function registrationScope() {
            it('should register an new API call', function registerApiCall() {
                // given
                var req = {};
                var res = {};
                res.send = sinon.spy();

                // when
                api.registerAPICall(req, res);

                // then
                res.send.calledWith('abc').should.be.true;
            });
        });
    });

}(require('../../../server/api.js'), require('sinon'), require('should')));