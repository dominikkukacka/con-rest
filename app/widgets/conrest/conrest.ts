module ConREST {
  import routeConfig = Modules.routeConfig;

  var routes: Array<Modules.IRouteSetting> = [
    {
      templateUrl: 'workflowsPage',
      routeUrl: '/',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'workflowPage',
      routeUrl: '/workflows/:workflowId',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'connectorPage',
      routeUrl: '/workflows/:workflowId/connectors/:connectorId',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'callPage',
      routeUrl: '/workflows/:workflowId/calls/:callId',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'mapperPage',
      routeUrl: '/workflows/:workflowId/connectors/:connectorId/mappers/:mapperId',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'workflowFormPage',
      routeUrl: '/register/workflow',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'workflowFormPage',
      routeUrl: '/workflows/:workflowId/edit',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'workflowExecutionPage',
      routeUrl: '/workflows/:workflowId/executions/:workflowExecutionId',
      controller: 'ConRESTVM'
    }, {
      templateUrl: 'executionPage',
      routeUrl: '/workflows/:workflowId/executions/:workflowExecutionId' +
      '/call/:executionId',
      controller: 'ConRESTVM'
    }];

  angular.module('con-rest.con-rest', [
    'con-rest.workflow-overview',
    'con-rest.workflow',
    'con-rest.workflow-execution',
    'con-rest.call-overview',
    'con-rest.call',
    'con-rest.connector',
    'con-rest.execution',
    'con-rest.file',
    'ngRoute',
    'ngMaterial'
  ])
    .config(routeConfig(routes))
    .controller(ConRESTVMS)
    .directive(ConRESTDirectives);
}
