var component = require('./login.module');

component.config(Routes);

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  //$locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '^/home',
      controller: 'HomeController as home',
      templateUrl: 'login/home.html',
      title: 'Garden Traveller - Home'
    })
    .state('inside', {
      url: '^/inside',
      controller: 'InsideController as inside',
      templateUrl: 'login/inside.html',
      title: 'Garden Traveller - Inside'
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
      title: 'Garden Traveller - Login'
    })
    .state('createGarden', {
      parent: 'inside',
      url: '^/createGarden',
      views: {
        'main': {
          controller: 'CreateGardenController as createGardenCtrl',
          templateUrl: 'creategarden/creategarden.html'
        }
      },
      title: 'Garden Traveller - Add Garden'
    })
    .state('admin', {
      parent: 'inside',
      url: '^/admin',
      views: {
        'main': {
          controller: 'AdminController as admin',
          templateUrl: 'admin/admin.html'
        }
      },
      title: 'Garden Traveller - Admin'
    })
    .state('signup', {
      parent: 'inside',
      url: '^/signup',
      views: {
        'main': {
          controller: 'SignupController as SignupController',
          templateUrl: 'signup/signup.html'
        }
      },
      title: 'Garden Traveller - Signup'
    });

  $urlRouterProvider.otherwise('/home');

}
