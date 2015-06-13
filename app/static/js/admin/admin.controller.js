var component = require('./admin.module');

class AdminController {
  constructor(apiService) {
    var vm = this;

    vm.amount;

  }

  addProduct(product) {
    apiService.addProduct(product).then(function() {

    });
  }
}

component.controller('AdminController', AdminController);
