// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(
  express, bodyParser, multer, api,
  workflow, mongoose, params, execution,
  workflowExecution, connector, config,
  mapper, file
) {
  'use strict';

  var app = express();

  var connect = config.getMongoConfig();
  var serverConfig = config.getServerConfig();
  params.extend(app);

  app.use(multer({
    inMemory: true
  }));
  app.use(bodyParser.json(serverConfig.parser));

  mongoose.connect(connect.uri, connect.options);

  var db = mongoose.connection;
  db.on('error', console.log);
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


    app.get('/api/mappers', mapper.getMappers);
    app.post('/api/mappers', mapper.createMapper);
    app.get('/api/mappers/:id', mapper.getMapperById);
    app.put('/api/mappers/:id', mapper.saveMapper);
    app.delete('/api/mappers/:id', mapper.deleteMapper);


    app.get('/api/workflows/:workflowId/connectors', connector.getConnectorsByWorkflowId);
    app.post('/api/workflows/:workflowId/connectors', connector.addConnectorToWorkflow);
    app.get('/api/workflows/:workflowId/connectors/:connectorId', connector.getConnectorById);
    app.put('/api/workflows/:workflowId/connectors/:connectorId', connector.saveConnector);
    app.delete('/api/workflows/:workflowId/connectors/:connectorId', connector.deleteConnector);


    app.get('/api/files', file.getFiles);
    app.post('/api/files', file.createFile);
    app.get('/api/files/:id', file.getFileById);
    app.put('/api/files/:id', file.saveFile);
    app.delete('/api/files/:id', file.deleteFile);
  });
  module.exports = app;

}(
  require('express'),
  require('body-parser'),
  require('multer'),
  require('./api.js'),
  require('./workflow.js'),
  require('mongoose'),
  require('express-params'),
  require('./execution.js'),
  require('./workflowExecution.js'),
  require('./connector.js'),
  require('./getConfig.js'),
  require('./mapper.js'),
  require('./file.js')
));
