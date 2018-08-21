const express = require('express')
const app = express()
require('./src/routes/index')(app);


const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`)
})