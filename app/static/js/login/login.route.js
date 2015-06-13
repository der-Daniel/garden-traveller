var component = require('./login.module');

component.config(Routes);

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  //$locationProvider.html5Mode(true);

  $stateProvider
    .state('login', {
      url: '^/login',
      views: {
        'main': {
          controller: 'OfferingController as offering',
          templateUrl: 'offering/offering.html'
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

  $urlRouterProvider.otherwise('/login');

}
