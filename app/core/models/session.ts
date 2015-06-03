module Models {
  export class Session {
    workflow: Workflow;
    calls: Array<Call>;
    connector: Connector;
  }

  export function session() {
    return new Session();
  }
}
