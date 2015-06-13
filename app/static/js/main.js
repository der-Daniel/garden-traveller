require('angular');
require('angular-route');
require('angular-strap');
require('angular-strap-tpl');
require('angular-sanitize');
require('./login');
require('./creategarden');
require('./templatecache.js');

var requires = [
  'ngRoute',
  'ngSanitize',
  'mgcrea.ngStrap',
  'app.templateCache',
  'app.login',
  'app.creategarden'
];

angular.module('app', requires);