var component = require('./login.module');

class InsideController {
  constructor($rootScope) {
    this.logedIn = false;

    var self = this;
    this.$rootScope = $rootScope;

    $rootScope.$on('logIn', function() {
      self.logedIn = true;
    });

    $rootScope.$on('logOut', function() {
      self.logedIn = false;
    });
  }

  logout() {
    this.$rootScope.$broadcast('logOut');
  }

}

component.controller('InsideController', InsideController);