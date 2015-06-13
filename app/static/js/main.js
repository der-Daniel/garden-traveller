require('angular');
require('angular-route');
require('./login');
require('./templatecache.js');

var requires = [
  'ngRoute',
  'app.templateCache',
  'app.login'
];

angular.module('app', requires);