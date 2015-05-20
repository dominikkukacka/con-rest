module StepLibrary {
  class Context {
    $parent: any;
    $scope: IScopeVM;
    $httpBackend: ng.IHttpBackendService;
    $element: ng.IRootElementService;
    directive: string;
    attributes: Object = {};

    constructor() {
      this.renew();
    }

    renew() {
      inject(($rootScope: ng.IRootScopeService, $httpBackend: ng.IHttpBackendService) => {
        this.$parent = $rootScope.$new();
        this.$httpBackend = $httpBackend;
      });
    }

    initializeDirective(widget: string) {
      inject(($compile, $rootScope) => {
        this.setDirective(widget);
        var directive = angular.element(this.directive);
        var element = $compile(directive)(this.$parent);
        $rootScope.$apply();
        this.$element = $(element);
        this.$scope = directive.children().scope();
      });
    }

    setDirective(widget: string) {
      var html = '<' + widget.toSnakeCase();
      for (var i in this.attributes) {
        if (this.attributes.hasOwnProperty(i)) {
          html += ' ' + i.toSnakeCase() + '="' + this.attributes[i] + '"';
        }
      }
      this.directive = html + '></' + widget.toSnakeCase() + '>';
    }
  }

  interface IScopeVM extends ng.IScope {
    vm: any;
  }

  export var ctx = new Context();
}
