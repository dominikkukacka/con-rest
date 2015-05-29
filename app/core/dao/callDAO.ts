module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import Call = Models.Call;

  export class CallDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getAll(): ng.IPromise<Array<Call>> {
      var deferred = this.$q.defer();
      this.get('/api/requests/', null)
        .then((response: any) => {
          var calls = [];
          for (var i = 0; i < response.data.length; i++) {
            calls.push(new Call(response.data[i]));
          }
          deferred.resolve(calls);
        }, deferred.reject);
      return deferred.promise;
    }

    getById(id: string): ng.IPromise<Call> {
      var deferred = this.$q.defer();
      this.get('/api/requests/' + id, null)
        .then((response: any) => {
          deferred.resolve(new Call(response.data));
        }, deferred.reject);
      return deferred.promise;
    }

    create(call: Call): ng.IPromise<Call> {
      var deferred = this.$q.defer();
      this.post('/api/requests/', call)
        .then((response: any) => {
          call._id = response.data;
          deferred.resolve(call);
        }, deferred.reject);
      return deferred.promise;
    }

    update(call: Call): ng.IPromise<Call> {
      var deferred = this.$q.defer();
      this.put('/api/requests/' + call._id, call.toJSON())
        .then((response: any) => {
          deferred.resolve(call);
        }, deferred.reject);
      return deferred.promise;
    }

    save(call: Call): ng.IPromise<Call> {
      if(!!call._id) {
        return this.update(call);
      } else {
        return this.create(call);
      }
    }

    search(name: string): ng.IPromise<Array<Call>> {
      var deferred = this.$q.defer();
      this.get('/api/requests/', {
        search: name
      }).then((response: any) => {
        var calls = [];
        for (var i = 0; i < response.data.length; i++) {
          calls.push(new Call(response.data[i]));
        }
        deferred.resolve(calls);
      }, deferred.reject);
      return deferred.promise;
    }
  }

  var instance = null;

  export function callDAO($injector: IInjectorService) {
    return instance = new CallDAO($injector);
  }
  callDAO.$inject = ['$injector'];
}
