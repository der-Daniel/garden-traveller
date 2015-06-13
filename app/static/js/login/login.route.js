var component = require('./login.module');

component.config(Routes);

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  //$locationProvider.html5Mode(true);

  $stateProvider.state('login', {
      url: '^/login', views: {
        'nav': {}, 'main': {
          controller: 'LoginController as login', templateUrl: 'login/login.html'
        }
      }, title: 'REA Jet Label Creator - Home'
    });

  $urlRouterProvider.otherwise('/login');

}
