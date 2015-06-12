module Modules {
  import MDThemingProvider = ng.material.MDThemingProvider;
  export function appConfig($mdThemingProvider: MDThemingProvider): ng.IAngularBootstrapConfig {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-green')
      .dark();
    return;
  }
  appConfig.$inject = ['$mdThemingProvider'];

  export interface IRouteSetting {
    templateUrl: string;
    routeUrl: string;
    controller?: string;
  }

  export function routeConfig(routes: Array<IRouteSetting>) {

    function routeProvider($routeProvider, $mdThemingProvider: MDThemingProvider): ng.IAngularBootstrapConfig {
      appConfig($mdThemingProvider);
      angular.forEach(routes, (setting: IRouteSetting) => {
        $routeProvider.when(setting.routeUrl, {
          templateUrl: setting.templateUrl,
          controller: setting.controller,
          caseInsensitiveMatch: true
        });
      });
      $routeProvider.otherwise(routes[0].routeUrl);
      return;
    }
    routeProvider.$inject = ['$routeProvider', '$mdThemingProvider'];

    return routeProvider;
  }

}
