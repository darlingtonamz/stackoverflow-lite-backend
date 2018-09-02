'use strict';

process.env.NODE_ENV = 'test';
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
let Answer = require('../../../src/models/Answer');
let Question = require('../../../src/models/Question');

let user1;
let user2;
let question1;
let answer1Q1;

function getAuthToken(user){
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET);
}

describe('Answers', async() => {
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

    // CREATE ANSWER
    answer1Q1 = await Answer.create({
      user_id: user2.id,
      question_id: question1.id,
      body: chance.paragraph(),
    });

    // done();
  });

  /*
   * Test the GET all answers route
   */
  describe('/GET all answers', () => {
    it('it should GET all the answers', (done) => {
      chai.request(app)
        .get(`/api/v1/questions/${question1.id}/answers`)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the POST answers route
   */
  describe('POST answer', () => {
    it('it should POST a answer ', (done) => {
      let answer = {
        body: 'How do I make an ebook',
      };
      chai.request(app)
        .post(`/api/v1/questions/${question1.id}/answers`)
        .send(answer)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.data).to.have.property('body');
          expect(res.body.data).to.have.property('id');
          done();
        });
    });
  });
  /*
   * Test the GET answer route
   */
  describe('GET answer', () => {
    it('it should GET a answer by the given id', (done) => {
      Answer.create({
        user_id: user2.id,
        question_id: question1.id,
        body: 'Some wonderful answer',
      })
        .then((answer) => {
          chai.request(app)
            .get(`/api/v1/questions/${question1.id}/answers/${answer.id}`)
            .send(answer)
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
   * Test the PUT /questions/:question_id/answers/:id route
   */
  describe('PUT answer', () => {
    it('it should succeed if owner Mark an answer as preferred',
      (done) => {
        chai.request(app)
          .put(`/api/v1/questions/${question1.id}/answers/${answer1Q1.id}`)
          .set('Authorization', `Bearer ${getAuthToken(user1)}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.data['accepted_answer_id'])
              .to.be.equal(answer1Q1.id);
            done();
          });
      });

    it('it should fail if owner Mark an answer as preferred', (done) => {
      chai.request(app)
        .put(`/api/v1/questions/${question1.id}/answers/${answer1Q1.id}`)
        .set('Authorization', `Bearer ${getAuthToken(user2)}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  /*
   * Test the PATCH /questions/:question_id/answers/:id route
   */
  describe('PATCH answer', () => {
    it('it should fail if non-owner is updating answer', (done) => {
      chai.request(app)
        .patch(`/api/v1/questions/${question1.id}/answers/${answer1Q1.id}`)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .send({
          body: 'new body',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should succeed if owner is updating answer', (done) => {
      chai.request(app)
        .patch(`/api/v1/questions/${question1.id}/answers/${answer1Q1.id}`)
        .set('Authorization', `Bearer ${getAuthToken(user2)}`)
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
   * Test the DELETE /questions/:question_id/answers/:id route
   */
  describe('DELETE answer', () => {
    it('it should succeed if owner is deleting answer', (done) => {
      Answer.create({
        user_id: user2.id,
        question_id: question1.id,
        body: 'Some wonderful answer',
      })
        .then((answer) => {
          chai.request(app)
            .delete(`/api/v1/questions/${question1.id}/answers/${answer.id}`)
            .set('Authorization', `Bearer ${getAuthToken(user2)}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });
    });

    it('it should fail if non-owner is deleting answer', (done) => {
      Answer.create({
        user_id: user2.id,
        question_id: question1.id,
        body: 'Some wonderful answer',
      })
        .then((answer) => {
          chai.request(app)
            .delete(`/api/v1/questions/${question1.id}/answers/${answer.id}`)
            .set('Authorization', `Bearer ${getAuthToken(user1)}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(401);
              done();
            });
        });
    });
  });
});
