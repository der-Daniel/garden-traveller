var component = require('./offering.module');

class OfferingController {
  constructor(apiService) {
    var vm = this;

    vm.amount = 0;
    vm.location = '';

    apiService.readAllOfferings().then(function(data) {
      vm.offerings = data.offerings;
    });


    // /api/product/all
    // /api/product attr -> name


  }

}

component.controller('OfferingController', OfferingController);