module Models {
  export class Connector extends Serializable {
    _id: string;
    source: Call;
    destination: Call;
    mapper: Mapper;

    constructor(json: IConnector) {
      super(json);
      this.source = this.convertIdToClass(json.source, Call);
      this.destination = this.convertIdToClass(json.destination, Call);
      this.mapper = this.convertIdToClass(json.destination, Mapper);
    }
  }

  export interface IConnector {
    _id: string;
    source?: string;
    destination?: string;
    mapper?: string;
  }
}
