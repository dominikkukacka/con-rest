/**
 * Created by sschacherl on 22.05.2015.
 */
module MapperVMS {
  import MapperDAO = DAO.MapperDAO;
  import Mapper = Models.Mapper;

  export class MapperVM {
    static $inject = ['$scope', 'mapperDAO'];
    mapper: Mapper = null;

    constructor($scope, mapperDAO: MapperDAO) {
      $scope.vm = this;
      mapperDAO.getById($scope.id)
        .then((mapper) => {
          this.mapper = mapper;
        });
    }
  }
}