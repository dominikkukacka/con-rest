// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope(mongoose, queue) {
    'use strict';

    var Schema = mongoose.Schema;

    var apiCallSchema = new Schema({
        url: String,
        method: String,
        data: Schema.Types.Mixed,
        headers: Schema.Types.Mixed
    });

    var APICall = mongoose.model('APICall', apiCallSchema);

    function getAPICalls(res) {
        var deferred = queue.defer();
        APICall.find(deferred.makeNodeResolver());
        deferred.promise.then(function returnResults(results) {
            res.send(results);
        });
        return deferred.promise;
    }

    function registerAPICall(req, res) {
        var apiCall = new APICall(req.data);
        var deferred = queue.defer();
        apiCall.save(deferred.makeNodeResolver());
        deferred.promise.then(function saveNewCall() {
            res.send(apiCall.id);
        });
        return deferred.promise;
    }

    module.exports = {
        APICall: APICall,
        getAPICalls: getAPICalls,
        registerAPICall: registerAPICall
    };
}(require('mongoose'), require('q')));