module ConREST {
  angular.module('con-rest.templates', []);

  angular.module('con-rest.dao', [])
    .factory(DAO);

  angular.module('con-rest.models', [])
    .factory(Models);

  angular.module('con-rest', ['con-rest.workflow-overview', 'con-rest.call-overview']);
}
