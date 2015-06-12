/**
 * Created by sschacherl on 22.05.2015.
 */
module MapperVMS {
  import MapperDAO = DAO.MapperDAO;
  import Mapper = Models.Mapper;
  import Map = Models.Map;
  import Session = Models.Session;

  export class MapperVM {
    static $inject = ['$scope', 'mapperDAO', 'session'];
    mapper: Mapper = null;
    mapperDAO: MapperDAO;
    session: Session;
    places: Array<string> = [
      'url',
      'header',
      'data'
    ];

    constructor($scope, mapperDAO: MapperDAO, session: Session) {
      this.mapperDAO = mapperDAO;
      this.session = session;
      $scope.vm = this;
      if (!!$scope.mapper) {
        this.mapper = $scope.mapper;
      } else if (!!$scope.id) {
        mapperDAO.getById($scope.id)
          .then((mapper) => {
            this.mapper = mapper;
          });
      }
    }

    addMap() {
      this.mapper.maps.push(new Map());
    }

    removeMap(map: Map) {
      var index = this.mapper.maps.indexOf(map);
      this.mapper.maps.splice(index, 1);
    }

    save() {
      this.mapperDAO.save(this.mapper)
        .then(() => {
          this.session.mapper = null;
        });
    }
  }
}
