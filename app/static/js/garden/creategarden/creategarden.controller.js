var component = require('./../garden.module');

component.controller('CreateGardenController', CreateGardenController);

function CreateGardenController(apiService) {
    var vm = this;

    vm.finish = finish;

    function finish() {
        var json = {
            name: vm.name,
            street: vm.street,
            houseNumber: vm.nr,
            zipCode: vm.plz,
            longitude: 0,
            latitude: 0
        };
        apiService.addGarden(json);
    }
}
