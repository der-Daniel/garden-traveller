var component = require('./login.module');

class LoginController {
  constructor(apiService, $state, $rootScope) {
    this.user = {
      'email': '',
      'pass': ''
    };

    this.warning = false;

    this.apiService = apiService;
    this.$state = $state;
    this.$rootScope = $rootScope;
  }

  login() {
    var self = this;
    this.apiService.login(this.user.email, this.user.pass).then(function(success) {
      if (success.success) {
        self.warning = false;
        self.$state.go('feed');
        self.$rootScope.$broadcast('logIn');
      } else {
        self.warning = true;
      }
    });
  }

}

component.controller('LoginController', LoginController);