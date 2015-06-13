var component = require('./login.module');

component.config(Routes);

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  //$locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '^/home',
      controller: 'HomeController as home',
      templateUrl: 'login/home.html',
      title: 'Home'
    })
    .state('inside', {
      url: '^/inside',
      controller: 'InsideController as inside',
      templateUrl: 'login/inside.html',
      title: 'Inside'
    })
    .state('login', {
      parent: 'inside',
      url: '^/login',
      views: {
        'main': {
          controller: 'LoginController as login',
          templateUrl: 'login/login.html'
        }
      },
      title: 'REA Jet Label Creator - Home'
    })
    .state('createGarden', {
      url: '^/createGarden',
      views: {
        'nav': {
        },
        'main': {
          controller: 'CreateGardenController as createGardenCtrl',
          templateUrl: 'creategarden/creategarden.html'
        }
      },
      title: 'REA Jet Label Creator - Home'
    });

  $urlRouterProvider.otherwise('/home');

}
