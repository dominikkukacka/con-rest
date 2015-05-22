module Models {
  export class Workflow extends Serializable {
    _id: string;
    name: string;
    calls: Array<any> = [];
    connectors: Array<any> = [];

    constructor(json: IWorkflow) {
      super(json);
      this.calls = this.convertContentToClass(json.calls, Call);
      this.connectors = this.convertContentToClass(json.connectors, Connector);
    }
  }

  export interface IWorkflow {
    _id: string;
    name?: string;
    calls?: Array<string>;
    connectors?: Array<string>;
  }
}
