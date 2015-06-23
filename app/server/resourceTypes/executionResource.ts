import {Resource} from 'rest-io';
import {Response, Request} from 'express';
import {Document} from 'mongoose';
import request = require('request');

class ExecutionResource extends Resource {
  execute(request) {

  }

  createRequestConfig(request) {

  }

  saveExecution(execution) {

  }

  create(req: Request, res: Response) {
    var id = req.params.id;
    this.model.findById(id)
      .populate('files.file')
      .exec()
      .then((request) => this.execute(request))
      .then((execution) => this.saveExecution(execution))
      .then((data) => res.send(data),
        (err: Error) => {
          this.errorHandler(err, res);
        });
  }
}

interface IRequest {

}

interface IExecution {
  statusCode: number;
  request: IRequest;
  url: string;
  response: string;
  headers: string;
  type: string;
  data: any;
}

export = ExecutionResource;
