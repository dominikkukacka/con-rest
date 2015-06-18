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
  .when('I view call "(.*)"', (name: string, done) => {
    supertest('http://localhost:1111')
      .get('/api/requests/' + globals.createIdBasedOnName(name))
      .end((req, res) => {
        this.result = res;
        expect(this.result.status).to.equal(200);
        done();
      });
  })
  .then('I expect to see "(.*)" as (.*)', (url: string, prop: string, done) => {
    expect(this.result.body[prop]).to.equal(url);
    done();
  });

export = library;
