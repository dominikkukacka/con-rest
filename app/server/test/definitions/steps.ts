import globals = require('./globals');
import library = globals.library;
import chai = require('chai');
var expect = chai.expect;
import supertest = require('supertest');
import mongoose = require('mongoose');
import ObjectId = mongoose.Types.ObjectId;

library
  .given('<Call><Name><Url><Method><Type>', (done) => done())
  .given('<Call><(.*)><(.*)><(.*)><(.*)>', (name: string, url: string, method: string, type: string, done) =>
    mongoose.model('APICall').create({
      _id: new ObjectId(globals.createIdBasedOnName(name)),
      url: url,
      name: name,
      method: method,
      type: type
    }).then(() => done()))
  .given('<Workflow><Name><Calls>', (done) => done())
  .given('<Workflow><(.*)><(.*)>', (name: string, callsCSV: string, done) => {
    mongoose.model('Workflow').create({
      _id: new ObjectId(globals.createIdBasedOnName(name)),
      name: name,
      calls: globals.convertCSVToIds(callsCSV)
    }).then(() => done());
  })
  .given('<Mapper><Name>', (done) => done())
  .given('<Mapper><(.*)>', (name: string, done) => {
    mongoose.model('Mapper').create({
      _id: new ObjectId(globals.createIdBasedOnName(name)),
      name: name
    }).then(() => done());
  })
  .given('<Map><OfMapper><Place><Source><Destination>', (done) => done())
  .given('<Map><(.*)><(.*)><(.*)><(.*)>', (mapper: string, place: string, source: string, dest: string, done) => {
    mongoose.model('Mapper').findByIdAndUpdate(globals.createIdBasedOnName(mapper), {
      $push: {
        maps: {
          place: place,
          source: source,
          destination: dest
        }
      }
    }).exec()
      .then(() => done());
  })
  .given('<Connector><Workflow><Source><Destination><Mapper>', (done) => done())
  .given('<Connector><(.*)><(.*)><(.*)><(.*)><(.*)>', (workflow: string, id: string, source: string, dest: string, mapper: string, done) => {
    mongoose.model('Workflow').findByIdAndUpdate(globals.createIdBasedOnName(workflow), {
      $push: {
        connectors: {
          _id: globals.createIdBasedOnName(id),
          source: globals.createIdBasedOnName(source),
          destination: globals.createIdBasedOnName(dest),
          mapper: globals.createIdBasedOnName(mapper),
        }
      }
    }).exec()
      .then(() => done());
  })
  .when('I view call "(.*)"', (name: string, done) => {
    supertest('http://localhost:1111')
      .get('/api/requests/' + globals.createIdBasedOnName(name))
      .end((req, res) => {
        this.inspect = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I view workflow "(.*)"', (name: string, done) => {
    supertest('http://localhost:1111')
      .get('/api/workflows/' + globals.createIdBasedOnName(name))
      .end((req, res) => {
        this.inspect = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I view all calls', (done) => {
    supertest('http://localhost:1111')
      .get('/api/requests/')
      .end((req, res) => {
        this.result = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I view all workflows', (done) => {
    supertest('http://localhost:1111')
      .get('/api/workflows')
      .end((req, res) => {
        this.result = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I view mapper "(.*)"', (name: string, done) => {
    supertest('http://localhost:1111')
      .get('/api/mappers/' + globals.createIdBasedOnName(name))
      .end((req, res) => {
        this.inspect = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I view all mappers', (done) => {
    supertest('http://localhost:1111')
      .get('/api/mappers')
      .end((req, res) => {
        this.result = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I view connector "(.*)" of workflow "(.*)"', (cname: string, wname: string, done) => {
    supertest('http://localhost:1111')
      .get('/api/workflows/' + globals.createIdBasedOnName(wname) +
        '/connectors/' + globals.createIdBasedOnName(cname))
      .end((req, res) => {
        this.inspect = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .when('I inspect the map on position "(.*)"', (pos: string, done) => {
    this.map = this.inspect.maps[parseInt(pos, 10)];
    done();
  })
  .when('I inspect (.*) (.*)', (anything: string, pos: string, done) => {
    this.inspect = this.result[parseInt(pos, 10)];
    done();
  })
  .when('I execute call (.*)', (call: string, done) => {
    supertest(`http://localhost:1111`)
      .post(`/api/requests/${globals.createIdBasedOnName(call)}/executions`)
      .end((req, res) => {
        this.inspect = res.body;
        expect(res.status).to.equal(200);
        done();
      });
  })
  .then('I expect to see "(.*)" as (.*)', (value: string, prop: string, done) => {
    expect(this.inspect[prop]).to.equal(value);
    done();
  })
  .then('I expect to see number "(.*)" as (.*)', (value: string, prop: string, done) => {
    expect(this.inspect[prop]).to.equal(parseInt(value, 10));
    done();
  })
  .then('I expect to see (.*) with id "(.*)"', (prop: string, value: string, done) => {
    expect(this.inspect[prop]._id).to.equal(globals.createIdBasedOnName(value));
    done();
  })
  .then('I expect to see ids "(.*)" as (.*)', (idsCSV: string, prop: string, done) => {
    var ids = globals.convertCSVToIds(idsCSV);
    var stringIds = [];
    this.inspect[prop].forEach((id) => {
      if (!!id._id) {
        stringIds.push(id._id);
      } else {
        stringIds.push(id);
      }
    });
    expect(this.inspect[prop].length).to.equal(ids.length);
    ids.forEach((id) => {
      expect(stringIds).to.include(id.toString());
    });
    done();
  })
  .then('I expect the map to have "(.*)" as (.*)', (value: string, prop: string, done) => {
    expect(this.map[prop]).to.equal(value);
    done();
  });

export = library;
