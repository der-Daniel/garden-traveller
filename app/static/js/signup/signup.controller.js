var component = require('./signup.module');

class SignupController {
  constructor(apiService) {
    this.user = {
      'email': '',
      'pass': ''
    };

    this.apiService = apiService;
  }

  register() {
    this.apiService.register(this.user.email, this.user.pass).then(function(success) {
      console.log(success);
    });
  }

}

component.controller('SignupController', SignupController);
