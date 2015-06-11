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
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      if (data instanceof FormData) {
        config.transformRequest = angular.identity;
        config.headers['Content-Type'] = undefined;
      }
      return this.$http(config);
    }

    get(url: string, params: Object) {
      return this.execute(this.GET, url, null, params);
    }

    post(url: string, data: Object, fileBoundaryName?: string, file?: any) {
      if (!!fileBoundaryName && !!file) {
        return this.execute(this.POST, url, this.createFormData(data, fileBoundaryName, file));
      } else {
        return this.execute(this.POST, url, data);
      }
    }

    put(url: string, data: Object, fileBoundaryName?: string, file?: any) {
      if (!!fileBoundaryName && !!file) {
        return this.execute(this.PUT, url, this.createFormData(data, fileBoundaryName, file));
      } else {
        return this.execute(this.PUT, url, data);
      }
    }

    del(url: string) {
      return this.execute(this.DELETE, url);
    }

    createFormData(data: Object, fileBoundaryName: string, file: any) {
      var formData = new FormData();
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          formData.append(prop, data[prop]);
        }
      }
      formData.append(fileBoundaryName, file);
      return formData;
    }
  }
}
