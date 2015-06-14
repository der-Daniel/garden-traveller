var component = require('./offering.module');

class EditController {
  constructor(apiService, $state) {
    this.name = 'jhskfhdkjfh'
    this.apiService = apiService;
    var vm = this;
    apiService.read().then(function(data) {
      vm.products = data.products;
    });
    apiService.getAllGardens().then(function(data) {
      vm.gardens = data.gardens;
    });
    this.$state = $state;
  }

  submit() {
    this.apiService.saveOffering({
      amount: parseInt(this.amount),
      price: parseInt(this.price),
      productId: parseInt(this.productId),
      gardenId: parseInt(this.gardenId)
    });
    console.log({
      amount: parseInt(this.amount),
      price: this.price,
      productId: this.productId,
      gardenId: this.gardenId
    });
    this.$state.go('offering')
  }
}

component.controller('EditController', EditController);
component.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});