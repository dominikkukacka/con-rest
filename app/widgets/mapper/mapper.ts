/**
 * Created by sschacherl on 22.05.2015.
 */
module ConREST {
  import appConfig = Modules.appConfig;
  angular.module('con-rest.mapper', [
    'con-rest.templates',
    'con-rest.dao',
    'con-rest.models',
    'ngMessages',
    'ngMaterial'
  ])
    .config(appConfig)
    .controller(MapperVMS)
    .directive(MapperDirectives);
}
