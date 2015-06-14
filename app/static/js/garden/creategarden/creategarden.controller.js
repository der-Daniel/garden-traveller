var component = require('./../garden.module');

var GMaps = require('gmaps');

class CreateGardenController{
  constructor(apiService) {
    var vm = this;

    this.apiService = apiService;
  }

  finish() {
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

  geoLocate() {
    var self = this;
    GMaps.geolocate({
      success: function(position) {
        var location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        self.apiService.locate(location).then(function(loc) {
          console.log(loc);
        });
      }
    });
  }
}

component.controller('CreateGardenController', CreateGardenController);


