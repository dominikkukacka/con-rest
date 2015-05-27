module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import IHttpService = ng.IHttpService;
  import IQService = ng.IQService;
  import ERRORS = Models.ERRORS;
  import IRequestConfig = ng.IRequestConfig;

  export class DAO {
    $http: IHttpService;
    GET = 'get';
    POST = 'post';
    PUT = 'put';
    DELETE = 'delete';
    $q: IQService;

    constructor(private $injector: IInjectorService) {
      this.$http = $injector.get('$http');
      this.$q = $injector.get('$q');
    }

    execute(method, url, data?, params?) {
      var config: IRequestConfig = {
        method: method,
        url: url,
        data: data,
        params: params,
        headers: {}
      };
      return this.$http(config);
    }

    get(url: string, params: Object) {
      return this.execute(this.GET, url, null, params);
    }

    post(url: string, data: Object) {
      return this.execute(this.POST, url, data);
    }

    put(url: string, data: Object) {
      return this.execute(this.PUT, url, data);
    }

    del(url: string) {
      return this.execute(this.DELETE, url);
    }
  }
}
