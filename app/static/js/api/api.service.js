var component = require('./api.module');

class apiService {
  constructor($resource) {
    this.fileApi = $resource('http://localhost:5000/', {path: '/'}, {
      addProduct: {
        method: 'PUT',
        params: {
          product: '@product'
        }
      }
    });

    this.getAllProducts = $resource('http://localhost:5000/api/product/all');

    this.signIn = $resource('http://localhost:5000/api/signin:email:password', {email: '', password: ''});
    this.signUp = $resource('http://localhost:5000/api/signup:surname:name:email:password:street:houseNumber:zipCode:city',
      {surname: '', name: '', email: '', password: '', street: '', houseNumber: '', zipCode: '', city: ''});

    this.gardenApi = $resource('http://localhost:5000/api/garden/');
    this.allGardenApi = $resource('http://localhost:5000/api/garden/all');
    this.offeringApiGet = $resource('http://localhost:5000/api/offering/:id', {id: 1});
    this.gardenApiAll = $resource('http://localhost:5000/api/garden/all');
    this.offeringApiAll = $resource('http://localhost:5000/api/offering/all');

    this.routeApi = $resource('http://localhost:5000/api/route');
    this.locateApi = $resource('https://router.project-osrm.org/match:loc');

    this.addProductApi = $resource('http://localhost:5000/api/product/:name', {name: ''});

    this.offeringApi = $resource('http://localhost:5000/api/offering');

  }

  postShopping() {
    return this.routeApi.save().$promise;
  }

  read() {
    return this.getAllProducts.get().$promise;
  }

  addGarden(json) {
    return this.gardenApi.save(json, function(data) {
      console.log(data);
    })
  }

  readOffering(id) {
    return this.offeringApi.get({id: id}).$promise;
  }

  getAllGardens() {
    return this.gardenApiAll.get().$promise;
  }

  readAllOfferings() {
    return this.offeringApiAll.get().$promise;
  }

  saveOffering(json) {
    return this.offeringApi.save(json).$promise;
  }

  addProduct(product) {
    return this.addProductApi.save({name: product}).$promise;
  }

  login(email, pass) {
    return this.signIn.save({email: email, password: pass}).$promise;
  }

  register(surname, name, email, pass, street, houseNumber, zipCode, city) {
    return this.signUp
      .save({surname: surname, name: name, email: email, password: pass, street: street,
        houseNumber: houseNumber, zipCode: zipCode, city: city})
      .$promise;
  }


  locate(loc) {
    return this.locateApi.save({loc: loc.lat + ',' + loc.lon}).$promise;
  }

  getAllGarden() {
    return this.allGardenApi.get().$promise;
  }

}

component.service('apiService', apiService);
