// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowDAOScope(angular, clazz, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.factory('workflowDAO', function workflowDAOScope(DAO) {
        function workflowDAO() {
            this.extend = 'DAO';

            this.public = {
                getWorkflow: function getWorkflow(id) {
                    return this.private.request('GET', '/api/workflows/' + id);
                },
                createNewWorkflow: function createNewWorkflow(workflowName, workflowCalls) {
                    return this.private.request('POST', '/api/workflows/', {
                        name: workflowName,
                        calls: workflowCalls
                    });
                },
                updateWorkflow: function updateWorkflow(workflow, workflowCalls) {
                    return this.private.request('PUT', '/api/workflows/' + workflow._id, {
                        _id: workflow._id,
                        name: workflow.name,
                        calls: workflowCalls
                    });
                },
                removeWorkflow: function removeWorkflow(id) {
                    return this.private.request('DELETE', '/api/workflows/' + id);
                },
                executeWorkflow: function executeWorkflow(id) {
                    return this.private.requestRaw('POST', '/api/workflows/' + id + '/executions');
                }
            };
        }

        var WorkflowDAO = clazz('WorkflowDAO', workflowDAO);
        return new WorkflowDAO();
    });
}(window.angular, window.enofjs.clazz));
