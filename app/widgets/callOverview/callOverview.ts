module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.call-overview', [
    'con-rest.templates',
    'con-rest.dao',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(CallOverviewVMS)
    .directive(CallOverviewDirectives);
}
