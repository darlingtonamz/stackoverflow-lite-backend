'use strict';

process.env.NODE_ENV = 'test';
const app = require('../../..');
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

describe('AnswerVotes', async() => {
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
  });

  /*
   * Test the PUT /questions/:question_id/answers/:id route
   */
  describe('PUT answer', () => {
    it('it should succeed if owner upvotes answer',
      (done) => {
        chai.request(app)
          .put(`/api/v1/answers/${answer1Q1.id}/answer_votes`)
          .set('Authorization', `Bearer ${getAuthToken(user1)}`)
          .send({
            value: 1,
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body.data['value'])
              .to.be.equal(1);
            done();
          });
      });

    it('it should succeed if owner downvotes answer',
      (done) => {
        chai.request(app)
          .put(`/api/v1/answers/${answer1Q1.id}/answer_votes`)
          .set('Authorization', `Bearer ${getAuthToken(user1)}`)
          .send({
            value: -1,
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.data['value'])
              .to.be.equal(-1);
            done();
          });
      });

    // it('it should succeed if owner cancels vote',
    //   (done) => {
    //     chai.request(app)
    //       .put(`/api/v1/answers/${answer1Q1.id}/answer_votes`)
    //       .set('Authorization', `Bearer ${getAuthToken(user1)}`)
    //       .send({
    //         value: 1,
    //       })
    //       .end((err, res) => {
    //         console.log('RES', res.body.data);
    //         expect(err).to.be.null;
    //         expect(res).to.have.status(200);
    //         expect(res.body.data['value'])
    //           .to.be.equal(0);
    //         done();
    //       });
    //   });
  });
});
