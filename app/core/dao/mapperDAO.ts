/**
 * Created by sschacherl on 22.05.2015.
 */
module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import Mapper = Models.Mapper;

  export class MapperDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getAll(): ng.IPromise<Array<Mapper>> {
      var deferred = this.$q.defer();
      this.get('/api/mappers/', null)
        .then((response: any) => {
          var mappers = [];
          for(var i = 0; i < response.data.length; i++) {
            mappers.push(new Mapper(response.data[i]));
          }
          deferred.resolve(mappers);
        }, deferred.reject);
      return deferred.promise;
    }

    getById(id: string): ng.IPromise<Mapper> {
      var deferred = this.$q.defer();
      this.get('/api/mappers/' + id, null)
        .then((response: any) => {
          deferred.resolve(new Mapper(response.data));
        }, deferred.reject);
      return deferred.promise;
    }
  }

  export function mapperDAO($injector: IInjectorService) {
    return new MapperDAO($injector);
  }

  callDAO.$inject = ['$injector'];
}
