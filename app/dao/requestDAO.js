(function requestDAOScope(angular, clazz, undefined) {
	'use strict';

	var app = angular.module('con-rest');

	app.factory('requestDAO', function requestDAOScope($http, $q, DAO) {
		function requestDAO() {
			this.extend = 'DAO';

			this.public = {
				getAll: function getAll() {
					return this.private.request('GET', '/api/requests/');
				},
				getCall: function getCall(id) {
					return this.private.request('GET', '/api/requests/' + id);
				},
				executeCall: function executeCall(id) {
					return this.private.requestRaw('POST', '/api/requests/' + id +
						'/executions');
				},
				getAvailableRequests: function getAvailableRequests() {
					return this.private.request('GET', '/api/requests/');
				},
				registerCall: function registerCall(restCall) {
					return this.private.request('POST', '/api/requests', restCall);
				},
				remove: function remove(id) {
					return this.private.request('DELETE', '/api/requests/' + id);
				},
				updateRestCall: function updateRestCall(restCall) {
					return this.private.request('PUT', '/api/requests/' + restCall._id,
						restCall);
				}
			};
		}

		var RequestDAO = clazz('RequestDAO', requestDAO);
		return new RequestDAO();
	});
}(window.angular, window.enofjs.clazz));
