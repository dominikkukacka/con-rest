// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(express, bodyParser, api, workflow, mongoose, params) {
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

        app.get('/api/requests/:id', api.getAPICallById);

        app.post('/api/requests', api.registerAPICall);

        app.get('/api/workflow/:id', workflow.getWorkflowById);

        app.get('/api/workflow/', workflow.getWorkflows);

        app.post('/api/workflow', workflow.registerWorkflow);

        app.put('/api/workflow/:id', workflow.saveWorkflow);
    });
    module.exports = app;

}(require('express'), require('body-parser'), require('./api.js'), require('./workflow.js'),
    require('mongoose'), require('express-params')));
