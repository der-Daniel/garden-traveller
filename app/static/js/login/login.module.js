require('angular-ui-router');

var requires = ['ui.router'];

module.exports = angular.module('app.login', requires);

require('./login.controller');
require('./login.route');