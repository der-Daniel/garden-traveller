var component = require('./login.module');

class LoginController {
  constructor(apiService, $state) {
    this.user = {
      'email': '',
      'pass': ''
    };

    this.warning = false;

    this.apiService = apiService;
    this.$state = $state;
  }

  login() {
    var self = this;
    this.apiService.login(this.user.email, this.user.pass).then(function(success) {
      if (success.success) {
        self.warning = false;
        self.$state.go('feed');
      } else {
        self.warning = true;
      }
    });
  }

}

component.controller('LoginController', LoginController);