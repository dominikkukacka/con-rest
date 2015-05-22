module Models {
  export class Connector extends Serializable {
    _id: string;
    source: Call;
    destination: Call;
    mapper: Mapper;

    constructor(json: IConnector) {
      super(json);
      this.source = this.instantiateClass(json.source, Call);
      this.destination = this.instantiateClass(json.destination, Call);
      this.mapper = this.instantiateClass(json.mapper, Mapper);
    }
  }

  export interface IConnector {
    _id: string;
    source?: ICall;
    destination?: ICall;
    mapper?: IMapper;
  }
}
