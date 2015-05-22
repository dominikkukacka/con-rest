module ConREST {
  import appConfig = Modules.appConfig;

  angular.module('con-rest.con-rest', [
    'con-rest.workflow-overview',
    'con-rest.workflow',
    'con-rest.call-overview',
    'con-rest.call',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(ConRESTVMS)
    .directive(ConRESTDirectives);
}
