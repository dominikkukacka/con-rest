// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function eventsScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('events', function eventsFactory() {
    return {
      CANCEL_EDITING: 'cancelEditing',
      CLOSE_WORKFLOW_DETAILS: 'closeWorkflowDetails',
      CONNECTOR_CREATED: 'connectorCreated',
      EXECUTION_DONE: 'executionDone',
      REGISTRATION_SUCCESSFUL: 'registrationSuccessful',
      REGISTRATION_FAILED: 'registrationFailed',
      REQUEST_FAILED: 'requestFailed',
      REQUEST_RETRIEVED: 'requestRetrieved',
      REQUEST_UPDATED: 'requestUpdated',
      REQUEST_DELETED: 'requestDeleted',
      REQUESTS_RETRIEVED: 'requestRetrieved',
      RESPONSE_RECEIVED: 'responseReceived',
      RETRIEVAL_FAILED: 'retrievalFailed',
      WORKFLOW_CREATED: 'workflowCreated',
      WORKFLOW_DELETED: 'workflowDeleted',
      WORKFLOW_DETAILS_REQUESTED: 'workflowDetailsRequested',
      WORKFLOW_RECEIVED: 'workflowReceived',
      WORKFLOW_UPDATED: 'workflowUpdated',
      WORKFLOWS_RETRIEVED: 'workflowsRetrieved'
    };
  });
}(window.angular));
