require('angular-ui-router');

var requires = ['ui.router', 'ngSanitize', 'mgcrea.ngStrap'];

module.exports = angular.module('app.creategarden', requires);

require('./creategarden.controller');