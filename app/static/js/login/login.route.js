var component = require('./login.module');

component.config(Routes);

function Routes($stateProvider, gsapifyRouterProvider, $urlRouterProvider) {

  //$locationProvider.html5Mode(true);

  gsapifyRouterProvider.transition('slideAbove', {
    duration: 1,
    ease: 'Quart.easeInOut',
    css: {
      y: '-100%'
    }
  });

  gsapifyRouterProvider.transition('slideBelow', {
    duration: 1,
    ease: 'Quart.easeInOut',
    css: {
      y: '100%'
    }
  });

  gsapifyRouterProvider.transition('slideLeft', {
    duration: 1,
    ease: 'Quint.easeInOut',
    css: {
      x: '-100%'
    }
  });

  gsapifyRouterProvider.transition('slideRight', {
    duration: 1,
    ease: 'Quint.easeInOut',
    delay: 0.5,
    css: {
      x: '100%'
    }
  });

  gsapifyRouterProvider.transition('fadeIn', {
    duration: 0.5,
    delay: 0.5,
    css: {
      opacity: 0,
    }
  });

  gsapifyRouterProvider.transition('fadeOut', {
    duration: 0.5,
    css: {
      opacity: 0,
    }
  });

  gsapifyRouterProvider.transition('scaleDown', {
    duration: 0.5,
    css: {
      scale: 0,
      opacity: 0
    }
  });

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
      title: 'Login',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'add garden',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'change garden',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'Admin',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'Signup',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'My Offerings',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'My Offerings > Edit',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'eating',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'community',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
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
      title: 'Map',
      data: {
        'gsapifyRouter.main': {
          enter: {
            'in': {
              transition: 'slideLeft',
              priority: 1
            },
            out: {
              transition: 'slideRight',
              priority: 1
            }
          }
        }
      }
    });

  $urlRouterProvider.otherwise('/home');

}

component.run(function($rootScope) {
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.title = toState.title;
  });
});