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
      title: 'Login'
    })
    .state('createGarden', {
      parent: 'inside',
      url: '^/createGarden',
      views: {
        'main': {
          controller: 'CreateGardenController as createGardenCtrl',
          templateUrl: 'garden/creategarden/creategarden.html'
        }
      },
      title: 'add garden'
    })
    .state('changeGarden', {
      parent: 'inside',
      url: '^/changeGarden',
      views: {
        'nav': {
        },
        'main': {
          controller: 'ChangeGardenController as changeGardenCtrl',
          templateUrl: 'garden/changegarden/changegarden.html'
        }
      },
      title: 'change garden'
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
      title: 'Admin'
    })
    .state('signup', {
      parent: 'inside',
      url: '^/signup',
      views: {
        'main': {
          controller: 'SignupController as signup',
          templateUrl: 'signup/signup.html'
        }
      },
      title: 'Signup'
    })
    .state('offering', {
      parent: 'inside',
      url: '^/offering',
      views: {
        'main': {
          controller: 'OfferingController as offering',
          templateUrl: 'offering/offering.html'
        }
      },
      title: 'My Offerings'
    })
    .state('offering/edit', {
      parent: 'inside',
      url: '^/offering/edit',
      views: {
        'main': {
          controller: 'EditController as edit',
          templateUrl: 'offering/edit.html'
        }
      },
      title: 'My Offerings > Edit'
    })
    .state('shopping', {
      parent: 'inside',
      url: '^/shopping',
      views: {
        'nav': {
        },
        'main': {
          controller: 'ShoppingController as shoppingCtrl',
          templateUrl: 'shopping/shopping.html'
        }
      },
      title: 'food trip'
    })
    .state('feed', {
      parent: 'inside',
      url: '^/feed',
      views: {
        'nav': {
        },
        'main': {
          templateUrl: 'feed/feed.html'
        }
      },
      title: 'community'
    })
    .state('map', {
      parent: 'inside',
      url: '^/map',
      views: {
        'nav': {
        },
        'main': {
          controller: 'MapController as mapCtrl',
          templateUrl: 'map/map.html'
        }
      },
      title: 'Map'
    });

  $urlRouterProvider.otherwise('/home');

}

component.run(function($rootScope) {
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.title = toState.title;
  });
});