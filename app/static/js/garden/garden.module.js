require('angular-ui-router');

var requires = ['ui.router', 'ngSanitize', 'ngAnimate', 'mgcrea.ngStrap'];

module.exports = angular.module('app.garden', requires);

require('./creategarden/creategarden.controller');
require('./changegarden/changegarden.controller');