module Models {
  import Workflow = Models.Workflow;

  export class WorkflowExecution extends Serializable {
    _id: string;
    workflow: string;
    executedAt: Date;
    executions: Array<Execution>;

    constructor(json: IWorkflowExecution) {
      super(json);
      this.workflow = this.convertIdToClass(json.workflow, Workflow)
      this.executedAt = new Date(json.executedAt);
      this.executions = this.convertContentToClass(json.executions, Execution);
    }
  }

  export interface IWorkflowExecution {
    _id: string;
    workflow: string;
    executedAt: number;
    executions: Array<IExecution>;
  }
}
