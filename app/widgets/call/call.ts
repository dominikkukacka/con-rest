module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.call', [
    'con-rest.templates',
    'con-rest.dao',
    'ui.ace',
    'ngMaterial',
    'ngMessages'
  ])
    .config(appConfig)
    .controller(CallVMS)
    .directive(CallDirectives);
}
