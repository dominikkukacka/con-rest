import {Resource, IResource} from 'rest-io';
import {Schema} from 'mongoose';
import {Request, Router, Application, Response} from 'express';

class FileResource extends Resource {
  createModel(resDef: IResource) {
    var fileSchema = new Schema(resDef.model, {
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
    });
    fileSchema.virtual('isImage').get(function() {
      return !!this.mime.match(/image\/(jp(e?)g|png|bmp)/);
    });
    return this.db.model(this.toClassName(resDef.name), fileSchema);
  }
}

export = FileResource;
