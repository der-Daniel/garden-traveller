require('angular');
require('angular-route');
require('./login');

var requires = [
  'ngRoute',
  'app.login'
];

angular.module('app', requires);