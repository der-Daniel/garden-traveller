var component = require('./signup.module');

class SignupController {
  constructor(apiService, $state, $timeout) {
    this.user = {
      'surname': '',
      'name': '',
      'email': '',
      'pass': ''
    };

    this.warning = false;
    this.success = false;
    this.message = '';

    this.apiService = apiService;
    this.$state = $state;
    this.$timeout = $timeout;
  }

  register() {
    var self = this;
    this.apiService.register(this.user.email, this.user.pass).then(function(success) {
      if (success.success) {
        self.warning = false;
        self.success = true;
        self.$timeout(function() {
          self.$state.go('feed');
          self.success = false;
        }, 3000);
      } else {
        self.message = success.message;
        self.warning = true;
      }
    });
  }

}

component.controller('SignupController', SignupController);
