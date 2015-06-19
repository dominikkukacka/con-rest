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
  .when('I inspect (.*) (.*)', (anything: string, pos: string, done) => {
    this.inspect = this.result[parseInt(pos, 10)];
    done();
  })
  .then('I expect to see "(.*)" as (.*)', (value: string, prop: string, done) => {
    expect(this.inspect[prop]).to.equal(value);
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
  });

export = library;
