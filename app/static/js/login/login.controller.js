var component = require('./login.module');

class LoginController {
  constructor() {
    this.test = 'MIAU!'
  }
}

component.controller('LoginController', LoginController);