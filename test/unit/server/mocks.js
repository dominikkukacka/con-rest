// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiMocksScope(monckoose) {
    'use strict';

    var apiCalls = [
        {
            _id: '545726928469e940235ce769',
            name: 'firstCall',
            url: 'http://test.one',
            method: 'GET',
            data: {
                page: 2
            },
            headers: null
        }
    ];

    var workflows = [
        {
            _id: '545726928469e940235ce769',
            name: 'firstWorkflow',
            calls: ['545c8129e0e00d50095212c5', '545c8139e0e00d50095212c6']
        }
    ];

    // Make sure the attribute is plural of the collection you try to mock and lowercase.
    var mock = {
        apicalls: new monckoose.MonckooseCollection(apiCalls),
        workflows: new monckoose.MonckooseCollection(workflows)
    };

    module.exports = mock;
}(require('monckoose')));