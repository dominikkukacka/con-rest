// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiMocksScope(monckoose) {
    'use strict';

    var apiCalls = [
        {
            url: 'http://test.one',
            method: 'GET',
            data: {
                page: 2
            },
            headers: null
        }
    ];

    // Make sure the attribute is plural of the collection you try to mock and lowercase.
    var mock = {
        apicalls: new monckoose.MonckooseCollection(apiCalls)
    };

    module.exports = mock;
}(require('monckoose')));