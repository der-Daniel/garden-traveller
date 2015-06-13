require('angular');
require('angular-route');
require('angular-strap');
require('angular-strap-tpl');
require('angular-sanitize');
require('angular-resource');
require('angular-animate');
require('./login');
require('./garden');
require('./templatecache.js');
require('jquery');
require('jquery.easing');
require('grayscale');
require('bootstrap');
require('./offering');
require('./admin');
require('./api');
require('./signup');

var requires = [
  'ngRoute',
  'ngSanitize',
  'ngResource',
  'mgcrea.ngStrap',
  'app.templateCache',
  'app.login',
  'app.offering',
  'app.admin',
  'app.api',
  'app.signup',
  'ngAnimate',
  'app.garden'
];

angular.module('app', requires);