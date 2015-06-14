var component = require('./signup.module');

class SignupController {
  constructor(apiService, $state, $timeout, $rootScope) {
    this.user = {
      'surname': '',
      'name': '',
      'email': '',
      'pass': '',
      'street': '',
      'zipcode': '',
      'city': '',
      'nr': ''
    };

    this.warning = false;
    this.success = false;
    this.message = '';

    this.apiService = apiService;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
  }

  register() {
    var self = this;
    this.apiService.register(
      this.user.surname,
      this.user.name,
      this.user.email,
      this.user.pass,
      this.user.street,
      this.user.nr,
      this.user.zipcode,
      this.user.city
    )
      .then(function(success) {
      if (success.success) {
        self.warning = false;
        self.success = true;
        self.$timeout(function() {
          self.$state.go('feed');
          self.success = false;
          self.$rootScope.$broadcast('logIn');
        }, 3000);
      } else {
        self.message = success.message;
        self.warning = true;
      }
    });
  }

}

component.controller('SignupController', SignupController);
