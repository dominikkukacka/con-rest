module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.workflow-overview', [
    'con-rest.templates',
    'con-rest.dao',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(WorkflowOverviewVMS)
    .directive(WorkflowOverviewDirectives);
}
