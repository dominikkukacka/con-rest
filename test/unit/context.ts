module StepLibrary {
  import IWorkflow = Models.IWorkflow;
  import ICall = Models.ICall;
  import IConnector = Models.IConnector;
  import Session = Models.Session;

  class Context {
    $parent: any;
    $scope: IScopeVM;
    $httpBackend: ng.IHttpBackendService;
    $element: ng.IRootElementService;
    directive: string;
    attributes: Object = {};
    workflows: Array<IWorkflow> = [];
    calls: Array<ICall> = [];
    session: Session;
    call: ICall;
    workflow: IWorkflow;
    connector: IConnector;

    constructor() {
      this.renew();
    }

    renew() {
      inject(($rootScope: ng.IRootScopeService, $httpBackend: ng.IHttpBackendService,
        session: Session) => {
        this.$parent = $rootScope.$new();
        this.$httpBackend = $httpBackend;
        this.attributes = {};
        this.workflows = [];
        this.calls = [];
        this.session = session;
        this.workflow = null;
        this.call = null;
        this.connector = null;
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
