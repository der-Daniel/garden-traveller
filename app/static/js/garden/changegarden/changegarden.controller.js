var component = require('./../garden.module');

component.controller('ChangeGardenController', ChangeGardenController);

function ChangeGardenController() {
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

    vm.edit = edit;
    vm.finish = finish;
    vm.delete = _delete;

    vm.editNr = -1;

    function edit(index) {
        if (vm.editNr == -1) {
          vm.editNr = index;
        }
    }

    function finish(index) {
        vm.editNr = -1;
        console.log('test');
    }

    function _delete(index) {

    }
}