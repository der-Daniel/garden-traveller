var component = require('./shopping.module');

component.controller('ShoppingController', ShoppingController);

var _ = require('lodash');
var GMaps = require('gmaps');

function ShoppingController(apiService, $state) {
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
        var self = this;
        /*
=======
    function finish() {/*
>>>>>>> readysteadyGO
        GMaps.geolocate({
            success: function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                var request = {};
                Object.keys(vm.shoppingList).forEach(function(id) {
                    if (_.get(vm.shoppingList, id + '.amount', 0) > 0) {
                        request[id].amount = vm.shoppingList[id].amount;
                    }
                    request.longitude = longitude;
                    request.latitude = latitude;
                });
<<<<<<< HEAD
                
                apiService.offer(request).then(function(resp) {
                    $state.go(map, {poi: resp});
=======

                apiService.postShopping().then(function(resp) {
                    console.log(resp);
                    $state.go('map', {poi: resp.via_points});
>>>>>>> readysteadyGO
                });
                
            }
<<<<<<< HEAD
        });
        */
        
                $state.go('map');
    }

}