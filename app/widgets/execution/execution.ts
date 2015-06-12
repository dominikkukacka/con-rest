module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.execution', [
    'con-rest.templates',
    'con-rest.dao',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(ExecutionVMS)
    .directive(ExecutionDirectives);
}
