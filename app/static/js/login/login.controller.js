var component = require('./login.module');

class LoginController {
  constructor(apiService) {
    this.user = {
      'name': '',
      'pass': ''
    };

    this.apiService = apiService;
  }

  login() {
    this.apiService.login(this.user.name, this.user.pass).then(function(success) {
      console.log(success);
    });
  }

}

component.controller('LoginController', LoginController);