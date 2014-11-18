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
        app.get('/api/requests', api.getAPICalls);

        app.param('id', String);

        app.get('/api/requests/:id/execute', api.executeAPICallById);
        app.get('/api/requests/:id', api.getAPICallById);

        app.post('/api/requests', api.registerAPICall);

        app.get('/api/workflows/:id/execute', workflow.executeWorkflowById);
        app.get('/api/workflows/:id', workflow.getWorkflowById);
        app.get('/api/workflows/:id/executions', workflowExecution.getWorkflowExecutionsByWorkflowId);

        app.get('/api/workflows/', workflow.getWorkflows);

        app.post('/api/workflows', workflow.registerWorkflow);

        app.put('/api/workflows/:id', workflow.saveWorkflow);

        app.get('/api/executions', execution.getExecutions);
        app.get('/api/executions/:id', execution.getExecutionById);
    });
    module.exports = app;

}(require('express'), require('body-parser'), require('./api.js'), require('./workflow.js'),
    require('mongoose'), require('express-params'), require('./execution.js'), require('./workflowExecution.js')));
