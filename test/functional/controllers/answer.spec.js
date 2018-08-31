process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
let Answer = require('../../../src/models/Answer');
let Question = require('../../../src/models/Question');

let user1, user2, question1, answer1Q1 = null

const request = require('supertest');
const app = require('../../../index');
describe('Answers', () => {
  it("does something", (done) => {
    debugger
    request(app).get("/")
    .expect(200, done)
  })
//   before(async (done) => {
//     user1 = {}
//     user2 = {}
//     // CREATE QUESTION
//     question1 = await Question.create({
//       title: 'Some title',
//       body: 'How do I make an ebook',
//       user_id: user1.id
//     }).catch(err => {
//       console.log(err)
//     })
//     // CREATE QUESTION
//     answer1Q1 = await Answer.create({
//       user_id: user2.id,
//       question_id: question1,
//       body: 'Some totally wonderful answer'
//     }).catch(err => {
//       console.log(err)
//       debugger
//     })

//     done();
//     // .then((result) => {
//     // }).catch((err) => { })
//   });

//   describe('/GET all answers', () => {
//     it('it should GET all the answers', (done) => {
//       request(server)
//         .get(`/api/v1/questions/${question.id}/answers`)
//         .expect(200, done);
//     });
//   });

//   describe('/POST answer', () => {
//     it('it should POST a answer ', (done) => {
//       let answer = {
//         title: 'Some title',
//         body: 'How do I make an ebook'
//       }
//       request(server)
//         .post(`/api/v1/questions/${question.id}/answers`)
//         .send(answer)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.data.should.have.property('title');
//           res.body.data.should.have.property('body');
//           res.body.data.should.have.property('answer_id');
//           res.body.data.should.have.property('id');
//           done();
//         });
//     });
//   });
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
//         request(server)
//           .get(`/api/v1/questions/${question.id}/answers/${answer.id}`)
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
//         request(server)
//           .delete(`/api/v1/questions/${question.id}/answers/${answer.id}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
        
//       }).catch((err) => {});
//     });
//   });

//   describe('UPDATES', () => {
//     it('it should Mark an answer as preferred', () => {      
//       request(server)
//       .patch(`/api/v1/questions/${question.id}/answers/${answer1Q1.id}/preferred`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//     })
//   })
});