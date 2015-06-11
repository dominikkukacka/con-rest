module Models {
  export class Call extends Serializable {
    _id: string;
    name: string;
    url: string;
    method: string;
    type: string;
    data: Object;
    headers: Object;
    files: Array<CallFile> = [];

    constructor(json?: ICall) {
      super(json);
      if(!!json && !!json.files) {
        json.files.forEach((callFile: ICallFile) => {
          this.files.push({
            boundaryName: callFile.boundaryName,
            file: new File({
              _id: callFile.file
            })
          })
        });
      }
    }

    toJSON() {
      var json: any = super.toJSON();
      json.files = [];
      this.files.forEach((file) => json.files.push({
        boundaryName: file.boundaryName,
        file: file.file._id
      }));
      return json;
    }
  }

  interface CallFile {
    boundaryName: string;
    file: File;
  }

  interface ICallFile {
    boundaryName: string;
    file: string;
  }

  export interface ICall {
    _id: string;
    name?: string;
    url?: string;
    method?: string;
    type?: string;
    data?: Object;
    headers?: Object;
    files?: Array<ICallFile>;
  }
}
