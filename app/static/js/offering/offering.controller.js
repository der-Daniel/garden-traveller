var component = require('./offering.module');

class OfferingController {
  constructor(apiService, $state) {
    var vm = this;

    vm.amount = 0;
    vm.location = '';

    apiService.readAllOfferings().then(function(data) {
      vm.offerings = data.offerings;
    });
    apiService.getAllGardens().then(function(data) {
      vm.gardens = data.gardens;
    });
    apiService.read().then(function(data) {
      vm.products = data.products;
    });


    // /api/product/all
    // /api/product attr -> name
    this.$state = $state;

  }

  add() {
    this.$state.go('offering/edit')
  }

}

component.controller('OfferingController', OfferingController);