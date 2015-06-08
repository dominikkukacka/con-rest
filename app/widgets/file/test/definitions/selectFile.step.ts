module Test {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('files have been uploaded before', () => {
      ctx.$httpBackend.expect('GET', '/api/files')
        .respond(200, [{
          _id: 'o1n2e3',
          name: 'o1n2e3',
          mime: 'application/pdf'
        }, {
          _id: 't1w2o3',
          name: 't1w2o3',
          mime: 'image/jpg'
        }, {
          _id: 't1h2r3e4e5',
          name: 't1h2r3e4e5',
          mime: 'image/png'
        }]);
    })
    .when('the files are requested', () => ctx.$scope.vm.loadFiles())
    .when('file on position $NUM is selected', (pos: string) => {
      ctx.$scope.vm.selectFile(ctx.$scope.vm.files[parseInt(pos, 10) - 1]);
      ctx.$scope.$apply();
    })
    .then('the parent file id has been updated',
      () => expect(ctx.$parent.fid).to.equal(ctx.$scope.vm.selectedFile._id));
}
