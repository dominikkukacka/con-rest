module ConREST {
  import appConfig = Modules.appConfig;

  angular.module('con-rest.con-rest', [
    'con-rest.workflow-overview',
    'con-rest.workflow',
    'con-rest.call-overview',
    'con-rest.call',
    'con-rest.connector',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(ConRESTVMS)
    .directive(ConRESTDirectives);
}
