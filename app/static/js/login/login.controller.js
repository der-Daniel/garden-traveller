var component = require('./login.module');

class LoginController {
  constructor(apiService) {
    this.user = {
      'email': '',
      'pass': ''
    };

    this.apiService = apiService;
  }

  login() {
    this.apiService.login(this.user.email, this.user.pass).then(function(success) {
      console.log(success);
    });
  }

}

component.controller('LoginController', LoginController);