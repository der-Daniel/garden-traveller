var component = require('./login.module');

class LoginController {
  constructor() {
    this.user = {
      'name': '',
      'pass': ''
    }
  }
}

component.controller('LoginController', LoginController);