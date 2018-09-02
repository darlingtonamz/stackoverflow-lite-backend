'use strict';
process.env.NODE_ENV = 'test';
// const request = require('supertest');
const app = require('../../../index');
var Chance = require('chance');
var chance = new Chance();

let chai = require('chai');
let chaiHttp = require('chai-http');
// let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');

let User = require('../../../src/models/User');

let user1;
// let user2;

function getAuthToken(user){
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET);
}

describe('Users', async() => {
  before(async() => {
    user1 = await User.create({
      fname: chance.first(),
      lname: chance.last(),
      email: chance.email(),
      password: 'password',
    });

    // user2 = await User.create({
    //   fname: chance.first(),
    //   lname: chance.last(),
    //   email: chance.email(),
    //   password: 'password',
    // });
  });

  /*
   * Test the POST users route
   */
  describe('POST user', () => {
    it('it should POST a user ', (done) => {
      let user = {
        fname: chance.first(),
        lname: chance.last(),
        email: chance.email(),
        password: 'password',
      };
      chai.request(app)
        .post('/api/v1/register')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.data).to.have.property('fname');
          expect(res.body.data).to.have.property('id');
          done();
        });
    });
  });
  /*
   * Test the GET user route
   */
  describe('GET user', () => {
    it('it should GET a user by the given id', (done) => {
      User.create({
        fname: chance.first(),
        lname: chance.last(),
        email: chance.email(),
        password: 'password',
      })
        .then((user) => {
          chai.request(app)
            .get(`/api/v1/users/${user.id}`)
            .send(user)
            .set('Authorization', `Bearer ${getAuthToken(user1)}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.have.property('email');
              expect(res.body.data).to.have.property('id');
              done();
            });
        });
    });
  });

  /*
   * Test the PATCH /users/:user_id/users/:id route
   */
  // describe('PATCH user', () => {
  //   it('it should fail if non-owner is updating user', (done) => {
  //     chai.request(app)
  //       .patch(`/api/v1/users/${user1.id}`)
  //       .set('Authorization', `Bearer ${getAuthToken(user2)}`)
  //       .send({
  //         fname: 'Namey'
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(401);
  //         done()
  //       });
  //   })

  //   it('it should succeed if owner is updating user', (done) => {
  //     chai.request(app)
  //       .patch(`/api/v1/users/${user1.id}`)
  //       .set('Authorization', `Bearer ${getAuthToken(user1)}`)
  //       .send({
  //         fname: 'Namey'
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         expect(res.body.data.body).to.be.equal('Namey')
  //         done()
  //       });
  //   })
  // })
});
