module Models {
  export class Call extends Serializable {
    _id: string;
    name: string;
    url: string;
    method: string;
    type: string;
    data: Object;
    headers: Object;
    files: Array<File> = [];

    constructor(json?: ICall) {
      super(json);
    }

    toJSON() {
      var json: any = super.toJSON();
      json.files = [];
      this.files.forEach((file) => json.files.push(file._id));
      return json;
    }
  }

  export interface ICall {
    _id: string;
    name?: string;
    url?: string;
    method?: string;
    type?: string;
    data?: Object;
    headers?: Object;
    files?: Array<string>;
  }
}
