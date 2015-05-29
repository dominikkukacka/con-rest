module Models {
  export class Execution extends Serializable {
    _id: string;
    workflow: Workflow;
    apiCall: Call;
    statusCode: number;
    url: string;
    response: Object;
    headers: Object;
    data: Object;

    constructor(json: IExecution) {
      super(json);
      this.workflow = this.convertIdToClass(json.workflow, Workflow);
      this.apiCall = this.convertIdToClass(json.apiCall, Call);
    }
  }

  export interface IExecution {
    _id: string;
    workflow?: string;
    apiCall?: string;
    statusCode?: number;
    url?: string;
    response?: Object;
    headers?: Object;
    data?: Object;
  }
}
