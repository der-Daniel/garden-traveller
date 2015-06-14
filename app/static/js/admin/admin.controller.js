var component = require('./admin.module');

class AdminController {
  constructor(apiService) {
    var vm = this;

    this.apiService = apiService;


  }

  addProduct() {
    this.apiService.addProduct(this.product).then(function(res) {
    });
  }
}

component.controller('AdminController', AdminController);
