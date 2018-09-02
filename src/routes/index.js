'use strict';

module.exports = function(app) {
  // Import routes for "catalog" area of site
  const ApiV1Router = require('./api/v1/index');

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to StackOverflow-Lite API home',
      current: 'api/v1',
    });
  });

  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger.json');

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // app.all('/api/v1', requireAuthentication, loadUser); // like middleware
  app.use('/api/v1/', ApiV1Router);
};
