module Models {
  export class Connector extends Serializable {
    _id: string;
    source: Call;
    destination: Call;
    mapper: Mapper;

    constructor(json?: IConnector) {
      if (!!json) {
        super(json);
        this.source = this.instantiateClass(json.source, Call);
        this.destination = this.instantiateClass(json.destination, Call);
        this.mapper = this.instantiateClass(json.mapper, Mapper);
      }
    }

    toJSON() {
      var json: any = {};
      json._id = this._id;
      json.source = this.extractId(this.source);
      json.destination = this.extractId(this.destination);
      json.mapper = this.extractId(this.mapper);
      return json;
    }
  }

  export interface IConnector {
    _id: string;
    source?: ICall;
    destination?: ICall;
    mapper?: IMapper;
  }
}
