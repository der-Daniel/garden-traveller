var component = require('./login.module');

component.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);