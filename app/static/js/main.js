require('angular');
require('angular-route');
require('./login');
require('./templatecache.js');
require('jquery');
require('jquery.easing');
require('grayscale');
require('bootstrap');

var requires = [
  'ngRoute',
  'app.templateCache',
  'app.login'
];

angular.module('app', requires);