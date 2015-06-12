module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.workflow-execution', [
    'con-rest.templates',
    'con-rest.dao',
    'con-rest.models',
    'con-rest.execution',
    'con-rest.call',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(WorkflowExecutionVMS)
    .directive(WorkflowExecutionDirectives);
}
