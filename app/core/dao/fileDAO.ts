module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import IFile = Models.IFile;
  import File = Models.File;

  export class FileDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getAll() {
      var deferred = this.$q.defer();
      this.get('/api/files', null)
        .then((response: any) => {
          var files: Array<File> = [];
          response.data.forEach((file: IFile) =>
            files.push(new File(file)));
          deferred.resolve(files);
        }, deferred.reject);
      return deferred.promise;
    }

    save(file: File) {
      var deferred = this.$q.defer();
      this.post('/api/files', {
        name: file.name
      }, 'file', file.file)
        .then((response: any) => {
          file._id = response.data;
          deferred.resolve(file);
        },
          deferred.reject);
      return deferred.promise;
    }
  }

  export function fileDAO($injector: IInjectorService) {
    return new FileDAO($injector);
  }
  fileDAO.$inject = ['$injector'];
}
