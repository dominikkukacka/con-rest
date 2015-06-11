module Models {
  export class File extends Serializable {
    _id: string;
    name: string;
    mime: string;
    file: any;

    constructor(json?: IFile) {
      if (!!json) {
        super(json);
      }
    }
  }

  export interface IFile {
    _id: string;
    name?: string;
    mime?: string;
  }
}
