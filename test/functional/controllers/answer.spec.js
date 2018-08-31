process.env.NODE_ENV = 'test';
// const request = require('supertest');
const app = require('../../../index');
var Chance = require('chance');
var chance = new Chance();

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require('jsonwebtoken')

// let mongoose = require("mongoose");
let User = require('../../../src/models/User');
let Answer = require('../../../src/models/Answer');
let Question = require('../../../src/models/Question');

let user1, user2, question1, answer1Q1 = null

function getAuthToken(user){
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET)
}

describe('Answers', async () => {
  // it("does something", (done) => {
  //   debugger
  //   request(app).get("/")
  //   .expect(200, done)
  // })

  before(async () => {
    // console.log("sldjksdjk")
    user1 = await User.create({
      "fname": chance.first(),
      "lname": chance.last(),
      "email": chance.email(),
      "password": "password"
    })

    user2 = await User.create({
      "fname": chance.first(),
      "lname": chance.last(),
      "email": chance.email(),
      "password": "password"
    })

    // CREATE QUESTION
    question1 = await Question.create({
      title: chance.sentence(),
      body: chance.paragraph(),
      user_id: user1.id
    })

    // CREATE QUESTION
    answer1Q1 = await Answer.create({
      user_id: user2.id,
      question_id: question1.id,
      body: chance.paragraph()
    })

    // done();
  });

  describe('/GET all answers', () => {
    it('it should GET all the answers', (done) => {
      chai.request(app)
        .get(`/api/v1/questions/${question1.id}/answers`)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .end((err, res) => {
          res.should.have.status(200);
          done()
        })
    });
  });

  describe('/POST answer', () => {
    it('it should POST a answer ', (done) => {
      let answer = {
        body: 'How do I make an ebook'
      }
      chai.request(app)
        .post(`/api/v1/questions/${question1.id}/answers`)
        .send(answer)
        .set('Authorization', `Bearer ${getAuthToken(user1)}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          // console.log('res: ', res.body)
          res.body.data.should.have.property('body');
          res.body.data.should.have.property('id');
          done();
        });
    });
  });
//   /*
//    * Test the /GET/:id route
//    */
//   describe('/GET/:id answer', () => {
//     it('it should GET a answer by the given id', (done) => {
//       Answer.create({
//         user_id: user2.id,
//         question_id: question1,
//         body: 'Some wonderful answer'
//       })
//       .then((answer) => {
//         chai.request(app)
//           .get(`/api/v1/questions/${question1.id}/answers/${answer.id}`)
//           .send(answer)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
        
//       }).catch((err) => {
        
//       });

//     });
//   });
//   /*
//    * Test the /DELETE/:id route
//    */
//   describe('/DELETE/:id answer', () => {
//     it('it should DELETE a answer by the given id', (done) => {
//       Answer.create({
//         user_id: user2.id,
//         question_id: question1,
//         body: 'Some wonderful answer'
//       })
//       .then((result) => {
//         chai.request(app)
//           .delete(`/api/v1/questions/${question1.id}/answers/${answer.id}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
        
//       }).catch((err) => {});
//     });
//   });

//   describe('UPDATES', () => {
//     it('it should Mark an answer as preferred', () => {      
//       chai.chai.request(app)
//       .patch(`/api/v1/questions/${question1.id}/answers/${answer1Q1.id}/preferred`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//     })
//   })
});