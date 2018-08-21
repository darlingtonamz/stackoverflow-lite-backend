module.exports = function(app) {
  const ApiV1Router = require('./api/v1/index');  //Import routes for "catalog" area of site

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to StackOverflow-Lite API home',
      current: 'api/v1'
    })
  })

  // app.all('/api/v1', requireAuthentication, loadUser); // like middleware
  app.use('/api/v1/', ApiV1Router)

};