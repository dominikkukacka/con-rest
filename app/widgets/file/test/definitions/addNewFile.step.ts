module Test {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import File = Models.File;
  var expect = chai.expect;

  library
    .given('the parent has provided a file model', () => ctx.$parent.fileModel = new File())
    .given('I provide a File as "(.*)"', (fileName: string) => ctx.$scope.vm.file.file = {
      name: 'fake file',
      buffer: []
    })
    .given('the file is valid', () => {
      ctx.$httpBackend.expect('POST', '/api/files').respond(200, 'f1i2l3e4');
    })
    .then('the file id should be set on the parent', () => {
      expect(ctx.$parent.fileModel._id).to.equal('f1i2l3e4');
    });
}
