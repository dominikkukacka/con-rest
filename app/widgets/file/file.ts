module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.file', [
    'con-rest.templates',
    'con-rest.dao',
    'con-rest.events',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(FileVMS)
    .directive(FileDirectives);
}
