// process.env.NODE_ENV = 'test';

// // let mongoose = require("mongoose");
// let Question = require('../../../src/models/Question');

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../../..');
// let should = chai.should();

// chai.use(chaiHttp);

// describe('Questions', () => {

//   before(async (done) => {
//     const app = require('../../../index');
//     done()
//   });

//   describe('/GET all questions', () => {
//     it('it should GET all the questions', (done) => {
//       chai.request(server)
//         .get('/api/v1/questions')
//         .end((err, res) => {
//           // console.log('RESULT: ', res.status)
//           res.should.have.status(200);
//           // res.body.should.be.a('array');
//           // res.body.length.should.be.eql(0);
//           done();
//         });
//     });

//     it('it should GET all USER the questions', (done) => {
//       const questionId = '1'
//       chai.request(server)
//         .get(`/api/v1/questions/${questionId}/questions`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
//   describe('/POST question', () => {
//     // it('it should not POST a question without pages field', (done) => {
//     //   let question = {
//     //     title: "The Lord of the Rings",
//     //     author: "J.R.R. Tolkien",
//     //     year: 1954
//     //   }
//     //   chai.request(server)
//     //     .post('/question')
//     //     .send(question)
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('object');
//     //       res.body.should.have.property('errors');
//     //       res.body.errors.should.have.property('pages');
//     //       res.body.errors.pages.should.have.property('kind').eql('required');
//     //       done();
//     //     });
//     // });
//     it('it should POST a question ', (done) => {
//       let question = {
//         title: 'Some title',
//         body: 'How do I make an ebook'
//       }
//       chai.request(server)
//         .post('/api/v1/questions')
//         .send(question)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.data.should.have.property('title');
//           res.body.data.should.have.property('body');
//           res.body.data.should.have.property('question_id');
//           res.body.data.should.have.property('id');
//           done();
//         });
//     });
//   });
//   /*
//    * Test the /GET/:id route
//    */
//   describe('/GET/:id question', () => {
//     it('it should GET a question by the given id', (done) => {
//       Question.create({
//         title: 'Some title',
//         body: 'How do I make an ebook'
//       })
//       .then((question) => {
//         chai.request(server)
//           .get('/api/v1/questions/' + question.id)
//           .send(question)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
        
//       }).catch((err) => {});

//     });
//   });
//   /*
//    * Test the /DELETE/:id route
//    */
//   describe('/DELETE/:id question', () => {
//     it('it should DELETE a question by the given id', (done) => {
//       Question.create({
//         title: 'Some title',
//         body: 'How do I make an ebook'
//       })
//       .then((question) => {
//         chai.request(server)
//           .delete('/api/v1/question/' + question.id)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
        
//       }).catch((err) => {});

//     });
//   });
// });