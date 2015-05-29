module Models {
  export class Call extends Serializable {
    _id: string;
    name: string;
    url: string;
    method: string;
    type: string;
    data: Object;
    headers: Object;

    constructor(json?: ICall) {
      super(json);
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
  }
}
