module ConREST {
  import appConfig = Modules.appConfig;

  angular.module('con-rest.con-rest', [
    'con-rest.workflow-overview',
    'con-rest.call-overview',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(ConRESTVMS)
    .directive(ConRESTDirectives);
}
