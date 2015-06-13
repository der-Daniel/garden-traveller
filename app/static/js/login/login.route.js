var component = require('./login.module');

component.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.
      when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController as login'
      }).
      otherwise({
        redirectTo: '/login'
      });
  });