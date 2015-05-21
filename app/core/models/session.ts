module Models {
  export class Session {
    workflow: Workflow;
  }

  export function session() {
    return new Session();
  }
}
