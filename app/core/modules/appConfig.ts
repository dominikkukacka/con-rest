module Modules {
  import MDThemingProvider = ng.material.MDThemingProvider;
  export function appConfig($mdThemingProvider: MDThemingProvider): ng.IAngularBootstrapConfig {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-green')
      .dark();
    return;
  }
  appConfig.$inject = ['$mdThemingProvider'];
}
