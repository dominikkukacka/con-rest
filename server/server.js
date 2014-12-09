// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(express, bodyParser, api, workflow, mongoose, params, execution, workflowExecution) {
    'use strict';

    var app = express();

    params.extend(app);

    app.use(bodyParser.json());

    mongoose.connect('mongodb://localhost:27017/apis');

    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function initiateServer() {
        app.param('id', String);

        app.get('/api/requests', api.getAPICalls);
        app.get('/api/requests/:id', api.getAPICallById);
        app.post('/api/requests', api.registerAPICall);
        app.put('/api/requests/:id', api.saveAPICall);
        app.delete('/api/requests/:id', api.deleteAPICall);

        app.get('/api/requests/:id/executions', api.getExecutionsByAPICallId);
        app.post('/api/requests/:id/executions', api.executeAPICallById);

        app.get('/api/workflows/', workflow.getWorkflows);
        app.get('/api/workflows/:id', workflow.getWorkflowById);
        app.post('/api/workflows', workflow.registerWorkflow);
        app.put('/api/workflows/:id', workflow.saveWorkflow);
        app.delete('/api/workflows/:id', workflow.deleteWorkflow);

        app.get('/api/workflows/:id/executions', workflowExecution.getWorkflowExecutionsByWorkflowId);
        app.get('/api/workflows/:workflowId/executions/:workflowExecutionId', workflowExecution.getExecutionsFromWorkflowId);
        app.post('/api/workflows/:id/executions', workflow.executeWorkflowById);

        app.get('/api/executions', execution.getExecutions);
        app.get('/api/executions/:id', execution.getExecutionById);
    });
    module.exports = app;

}(require('express'), require('body-parser'), require('./api.js'), require('./workflow.js'),
    require('mongoose'), require('express-params'), require('./execution.js'), require('./workflowExecution.js')));
