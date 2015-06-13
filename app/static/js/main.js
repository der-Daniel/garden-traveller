require('angular');
require('angular-route');
require('angular-strap');
require('angular-strap-tpl');
require('angular-sanitize');
require('./login');
require('./creategarden');
require('./templatecache.js');
require('jquery');
require('jquery.easing');
require('grayscale');
require('bootstrap');

var requires = [
  'ngRoute',
  'ngSanitize',
  'mgcrea.ngStrap',
  'app.templateCache',
  'app.login',
  'app.creategarden'
];

angular.module('app', requires);