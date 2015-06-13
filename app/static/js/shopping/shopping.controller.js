var component = require('./shopping.module');

component.controller('ShoppingController', ShoppingController);

function ShoppingController(apiService) {
    var vm = this;

    loadData();

    //Abfrage der verfügbaren Produkte
    vm.products = [
        {
            product: 'apfel',
            quantity: 10,
            toBuy: 0
        },
        {
            product: 'phy',
            quantity: 100,
            toBuy: 0
        }
    ];

    vm.decrease = decrease;
    vm.increase = increase;
    vm.finish = finish;


    function decrease(index) {
        if (vm.products[index].toBuy > 0)
            vm.products[index].toBuy -= 1;
    }
    function increase(index) {
        if (vm.products[index].toBuy < vm.products[index].quantity)
            vm.products[index].toBuy += 1;
    }

    function finish() {

    }

    function loadData() {
        var promise = apiService.readOffering();
        promise.then(function(data) {
            console.log(data);
        });
    }

}