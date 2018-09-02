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

// let mongoose = require('mongoose');
let User = require('../../../src/models/User');
let Question = require('../../../src/models/Question');

let user1;
let user2;
let question1;

function getAuthToken(user){
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET);
}

describe('Questions', async() => {
  before(async() => {
    user1 = await User.create({
      fname: chance.first(),
      lname: chance.last(),
      email: chance.email(),
      password: 'password',
    });

    user2 = await User.create({
      fname: chance.first(),
      lname: chance.last(),
      email: chance.email(),
      password: 'password',
    });

    // CREATE QUESTION
    question1 = await Question.create({
      title: chance.sentence(),
      body: chance.paragraph(),
      user_id: user1.id,
    });
  });

  /*
   * Test the GET all questions route
   */
  describe('/GET all questions', () => {
    it('it should GET all the questions', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the POST questions route
   */
  describe('POST question', () => {
    it('it should POST a question ', (done) => {
      let question = {
        title: chance.sentence(),
        body: chance.paragraph(),
      };
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          // console.log('res: ', res.body)
          expect(res.body.data).to.have.property('body');
          expect(res.body.data).to.have.property('id');
          done();
        });
    });
  });
  /*
   * Test the GET question route
   */
  describe('GET question', () => {
    it('it should GET a question by the given id', (done) => {
      Question.create({
        title: chance.sentence(),
        body: chance.paragraph(),
        user_id: user1.id,
      })
        .then((question) => {
          chai.request(app)
            .get(`/api/v1/questions/${question.id}`)
            .send(question)
            .set('Authorization', `Bearer ${getAuthToken(user1)}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.have.property('body');
              expect(res.body.data).to.have.property('id');
              done();
            });
        });
    });
  });

  /*
   * Test the PATCH /questions/:question_id/questions/:id route
   */
  describe('PATCH question', () => {
    it('it should fail if non-owner is updating question', (done) => {
      chai.request(app)
        .patch(`/api/v1/questions/${question1.id}`)
        .set('Authorization', `Bearer ${getAuthToken(user2)}`)
        .send({
          body: 'new body',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should succeed if owner is updating question', (done) => {
      chai.request(app)
        .patch(`/api/v1/questions/${question1.id}`)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .send({
          body: 'new body',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data.body).to.be.equal('new body');
          done();
        });
    });
  });
  /*
   * Test the DELETE /questions/:question_id/questions/:id route
   */
  describe('DELETE question', () => {
    it('it should succeed if owner is deleting question', (done) => {
      Question.create({
        title: chance.sentence(),
        body: chance.paragraph(),
        user_id: user1.id,
      })
        .then((question) => {
          chai.request(app)
            .delete(`/api/v1/questions/${question.id}`)
            .set('Authorization', `Bearer ${getAuthToken(user1)}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });
    });

    it('it should fail if non-owner is deleting question', (done) => {
      Question.create({
        title: chance.sentence(),
        body: chance.paragraph(),
        user_id: user1.id,
      })
        .then((question) => {
          chai.request(app)
            .delete(`/api/v1/questions/${question.id}`)
            .set('Authorization', `Bearer ${getAuthToken(user2)}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(401);
              done();
            });
        });
    });
  });
});
