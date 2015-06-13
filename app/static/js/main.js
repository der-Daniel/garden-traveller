require('angular');
require('angular-route');
require('angular-strap');
require('angular-strap-tpl');
require('angular-sanitize');
require('angular-resource');
require('./login');
require('./creategarden');
require('./templatecache.js');
require('jquery');
require('jquery.easing');
require('grayscale');
require('bootstrap');
require('./offering');
require('./admin');
require('./api');

var requires = [
  'ngRoute',
  'ngSanitize',
  'ngResource',
  'mgcrea.ngStrap',
  'app.templateCache',
  'app.login',
  'app.creategarden',
  'app.offering',
  'app.admin',
  'app.api'
];

angular.module('app', requires);