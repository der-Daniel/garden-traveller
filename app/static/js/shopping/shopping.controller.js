var component = require('./shopping.module');

component.controller('ShoppingController', ShoppingController);

var _ = require('lodash');

function ShoppingController(apiService) {
    var vm = this;

    getAllProducts();





    vm.decrease = decrease;
    vm.increase = increase;
    vm.finish = finish;
    vm.getAllProducts = getAllProducts;
    vm.shoppingList = {};



    function getAllProducts() {
        //Abfrage der verfügbaren Produkte
        apiService.read().then(function(products) {
            vm.products = products.products;
        });
    }

    function decrease(product, id) {
        _.set(vm.shoppingList, id + '.amount', _.get(vm.shoppingList, id + '.amount', 0) - 1);
        _.set(vm.shoppingList, id + '.product', product);
    }

    function increase(product, id) {
        _.set(vm.shoppingList, id + '.amount', _.get(vm.shoppingList, id + '.amount', 0) + 1);
        _.set(vm.shoppingList, id + '.product', product);
    }

    function finish() {

    }

}