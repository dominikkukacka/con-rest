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
    executedAt: Date;

    constructor(json: IExecution) {
      super(json);
      this.workflow = this.convertIdToClass(json.workflow, Workflow);
      this.apiCall = this.convertIdToClass(json.apiCall, Call);
      this.executedAt = new Date(json.executedAt);
    }
  }

  export interface IExecution {
    _id: string;
    workflow: string;
    apiCall: string;
    statusCode: number;
    url: string;
    response: Object;
    headers: Object;
    data: Object;
    executedAt: number;
  }
}
