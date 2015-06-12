module Test {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import Mapper = Models.Mapper;
  import IMap = Models.IMap;
  import Map = Models.Map;
  var expect = chai.expect;

  library
    .given('the parent provides a mapper model', () => {
      ctx.$parent.mapper = new Mapper();
    })
    .given('I provide a map on position $NUM with "(.*)" as "(.*)"', (pos: string, value: string, prop: string) => {
      var mapIndex = parseInt(pos, 10) - 1;
      var map = ctx.$scope.vm.mapper.maps[mapIndex];
      map = map || new Map();
      map[prop] = value;
      ctx.$scope.vm.mapper.maps[mapIndex] = map;
    })
    .given('the mapper will be saved successfully', () => {
      var mapper: Mapper = ctx.$scope.vm.mapper;
      var maps: Array<any> = [];
      mapper.maps.forEach((map: Map) => {
        maps.push({
          place: map.place,
          source: map.source,
          destination: map.destination
        });
      });
      ctx.$httpBackend.expect('POST', '/api/mappers/', {
        name: mapper.name,
        maps: maps
      }).respond(200, 'm1a2p3p4e5r6');
    })
    .then('I expect an id on the mapper model', () => {
      expect(ctx.$parent.mapper._id).to.equal('m1a2p3p4e5r6');
    });
}
