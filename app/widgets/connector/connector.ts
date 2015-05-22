module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.connector', [
    'con-rest.templates',
    'con-rest.dao',
    'con-rest.models',
    'con-rest.call',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(ConnectorVMS)
    .directive(ConnectorDirectives);
}
