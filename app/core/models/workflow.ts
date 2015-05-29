module Models {
  export class Workflow extends Serializable {
    _id: string;
    name: string;
    calls: Array<any> = [];
    connectors: Array<any> = [];

    constructor(json: IWorkflow = {}) {
      super(json);
      this.calls = this.convertContentToClass(json.calls, Call);
      this.connectors = this.convertContentToClass(json.connectors, Connector);
    }

    toJSON() {
      var json: any = super.toJSON();
      json.calls = this.extractIds(this.calls);
      json.connectors = this.extractIds(this.connectors);
      return json;
    }
  }

  export interface IWorkflow {
    _id?: string;
    name?: string;
    calls?: Array<string>;
    connectors?: Array<string>;
  }
}
