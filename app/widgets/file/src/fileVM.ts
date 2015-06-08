module FileVMS {
  import FileDAO = DAO.FileDAO;
  import File = Models.File;

  export class FileVM {
    static $inject = ['$scope', 'fileDAO'];

    file: File;
    files: Array<File> = [];
    selectedFile: File;
    newFile: boolean = false;
    $scope: any;
    fileDAO: FileDAO;

    constructor($scope, fileDAO: FileDAO) {
      $scope.vm = this;
      this.file = $scope.file;
      this.$scope = $scope;
      this.fileDAO = fileDAO;
    }

    loadFiles() {
      this.fileDAO.getAll()
        .then((files: Array<File>) =>
          this.files = files);
    }

    addFile() {
      this.newFile = true;
      this.selectedFile = new File();
    }

    selectFile(file: File) {
      this.$scope.fileId = file._id;
      this.selectedFile = file;
    }

    save() {
      this.fileDAO.save(this.file);
    }
  }
}
