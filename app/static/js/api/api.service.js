var component = require('./api.module');

class apiService {
  constructor($resource, $http) {
    this.fileApi = $resource('http://10.251.0.39:5000/', {path: '/'}, {
      addProduct: {
        method: 'PUT',
        params: {
          product: '@product'
        }
      }
    });

    this.productApi = $resource('http://10.251.0.39:5000/api/product/all');

    this.signIn = $resource('http://10.251.0.39:5000/api/signin:email:password', {email: '', password: ''});
    this.signUp = $resource('http://10.251.0.39:5000/api/signup:email:password', {email: '', password: ''});

    this.gardenApi = $resource('http://10.251.0.39:5000/api/garden');
    this.offeringApi = $resource('http://10.251.0.39:5000/api/offering');

  }

  read() {
    return this.productApi.get().$promise;
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

  register(email, pass) {
    return this.signUp.save({email: email, password: pass}).$promise;
  }

}

component.service('apiService', apiService);
