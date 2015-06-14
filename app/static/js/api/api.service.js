var component = require('./api.module');

class apiService {
  constructor($resource) {
    this.fileApi = $resource('http://192.168.1.117:5000/', {path: '/'}, {
      addProduct: {
        method: 'PUT',
        params: {
          product: '@product'
        }
      }
    });

    this.getAllProducts = $resource('http://192.168.1.117:5000/api/product/all');

    this.signIn = $resource('http://192.168.1.117:5000/api/signin:email:password', {email: '', password: ''});
    this.signUp = $resource('http://192.168.1.117:5000/api/signup:surname:name:email:password:street:houseNumber:zipCode:city',
      {surname: '', name: '', email: '', password: '', street: '', houseNumber: '', zipCode: '', city: ''});

    this.gardenApi = $resource('http://192.168.1.117:5000/api/garden');
    this.offeringApi = $resource('http://192.168.1.117:5000/api/offering');

    this.locate = $resource('https://router.project-osrm.org/match:loc')

  }

  read() {
    return this.getAllProducts.get().$promise;
  }

  addGarden(json) {
    return this.gardenApi.save(json, function(data) {
      console.log(data);
    })
  }

  readOffering() {
    return this.offeringApi.get().$promise;
  }

  addProduct(product) {
    return this.fileApi.addProduct({path: 'api/product',product: product}).$promise;
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
    return this.locate.get({loc: loc}).$promise;
  }

}

component.service('apiService', apiService);
