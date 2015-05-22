module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.workflow', [
    'con-rest.templates',
    'con-rest.dao',
    'con-rest.models',
    'con-rest.call',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(WorkflowVMS)
    .directive(WorkflowDirectives);
}
