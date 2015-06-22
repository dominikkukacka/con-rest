import {Resource} from 'rest-io';
import {Schema} from 'mongoose';
import workflow = require('./workflow');

var workflowExecution = new Resource({
  name: 'workflowExecution',
  model: {
    workflow: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow'
    },
    executions: [{
      type: Schema.Types.ObjectId,
      ref: 'Execution'
    }],
    executedAt: Date
  },
  parentRef: 'workflow',
  parentResource: workflow
});
