process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
let User = require('../../../src/models/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../..');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    // User.remove({}, (err) => {
    done();
    // });
  });
  describe('/POST user', () => {
    it('it should POST a user ', (done) => {
      let user = {
        fname: 'amanze',
        lname: 'ogbonna',
        email: 'some@mail.com',
        password: 'password'
      }
      chai.request(server)
        .post('/api/v1/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('fname');
          res.body.data.should.have.property('lname');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('id');
          done();
        });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      user.create({
        fname: 'amanze',
        lname: 'ogbonna',
        email: 'some@mail.com',
        password: 'password'
      })
      .then((user) => {
        chai.request(server)
          .get('/api/v1/users/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        
      }).catch((err) => {});

    });
  });
});