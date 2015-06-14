require('angular-ui-router');
require('angular-gsapify-router');

var requires = ['ui.router', 'hj.gsapifyRouter'];

module.exports = angular.module('app.login', requires);

require('./login.controller');
require('./login.route');
require('./home.controller');
require('./inside.controller');
require('./enter.directive');