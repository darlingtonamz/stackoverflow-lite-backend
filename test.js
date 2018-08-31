const Question = require('./src/models/Question')
const User = require('./src/models/User')

// const question = Question.new({
//   title: 'hdjfhdjfh',
//   body: "sdhjfjdhfjdfhdjf"
// })

const user = User.findBy('id', 20)
.then((result) => {
  // debugger
}).catch((err) => {
  console.log(err)
});
// console.log(question, question.title)
console.log(user, user.fname)