var component = require('./../garden.module');

component.controller('ChangeGardenController', ChangeGardenController);

function ChangeGardenController(apiService) {
    var vm = this;

    vm.gardens = [
        {
            street: 'test',
            nr: '1',
            plz: '01234',
            city: 'da'
        },
        {
            street: 'testasdsadds',
            nr: '1',
            plz: '01234',
            city: 'da'
        }
    ];

    loadData();

    vm.edit = edit;
    vm.finish = finish;
    vm.delete = _delete;

    vm.editNr = -1;

    function edit(index) {
        if (vm.editNr != index) {console.log(vm.editNr);
           vm.editNr = index;
            var e = document.getElementById('changeGardenStreet'+index);
            e.removeAttribute('disabled');

            e = document.getElementById('changeGardenNr'+index);
            e.removeAttribute('disabled');

            e = document.getElementById('changeGardenPlz'+index);
            e.removeAttribute('disabled');

            e = document.getElementById('changeGardenCity'+index);
            e.removeAttribute('disabled');

        }
    }

    function finish(index, event) {
        console.log('finish');
        event.stopPropagation();

        var e = document.getElementById('changeGardenStreet'+index);
        e.setAttribute('disabled', 'disabled');

        e = document.getElementById('changeGardenNr'+index);
        e.setAttribute('disabled', 'disabled');

        e = document.getElementById('changeGardenPlz'+index);
        e.setAttribute('disabled', 'disabled');

        e = document.getElementById('changeGardenCity'+index);
        e.setAttribute('disabled', 'disabled');

        vm.editNr = -1;
    }

    function _delete(index, event) {
        event.stopPropagation();
        console.log('delete');
        vm.gardens.splice(index, 1);
    }

    function loadData(){
        vm.gardens = [];
        var promise = apiService.getAllGarden();
        promise.then(function(data) {
            angular.forEach(data.gardens, function(garden) {
                vm.gardens.push({
                    name: garden.name,
                    street: garden.street,
                    nr: garden.house_number,
                    plz: garden.zipcode,
                    city: garden.city
                })
            })
        })
    }
}