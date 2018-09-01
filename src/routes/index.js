module.exports = function(app) {
  const ApiV1Router = require('./api/v1/index');  //Import routes for "catalog" area of site

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to StackOverflow-Lite API home',
      current: 'api/v1'
    })
  })
  
  var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // app.all('/api/v1', requireAuthentication, loadUser); // like middleware
  app.use('/api/v1/', ApiV1Router)

};