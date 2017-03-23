'use strict';

require('./mock-assets/mock-env.js');

const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user.js');
const userMock = require('./lib/user-mocks.js');
const serverControl = require('./lib/server-control.js');
const baseURL = `http://localhost:${process.env.PORT}`;
require('../server.js');

describe('testing user-router', function() {
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach(done => {
    User.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/signup', function() {
    it('should respond with a user', done => {
      superagent.post(`${baseURL}/api/signup`)
      .send({
        username: 'faknamemkfakey',
        email: 'wuwut.@email.com',
        password: 'round2',
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(Boolean(res.text)).to.equal(true);
        done();
      })
      .catch(done);
    });
///stopping here for now
    it()
  })
})
