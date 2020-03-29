/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  
  app.use('/api/users', require('./api/user'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/categorys', require('./api/category'));

  app.use('/auth', require('./auth'));
  

};
