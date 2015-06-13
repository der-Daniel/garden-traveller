var component = require('./offering.module');

class OfferingController {
  constructor(apiService) {
    var vm = this;

    vm.product;
    vm.amount = 0;
    vm.location = '';

    apiService.read('api/product/all').then(function(products) {
      console.log(products);
      vm.product = products;
    });


    // /api/product/all
    // /api/product attr -> name


  }

}

component.controller('OfferingController', OfferingController);