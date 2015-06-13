var component = require('./api.module');

class apiService {
  constructor($resource) {
    this.fileApi = $resource('http://10.251.0.39:5000/', {path: '/'}, {
      addProduct: {
        method: 'PUT',
        params: {
          product: '@product'
        }
      }
    });

  }

  read(path) {
    return this.fileApi.get({path: path}).$promise;
  }

  addProduct(product) {
    return this.fileApi.addProduct({product: product}).$promise;
  }

}

component.service('apiService', apiService);
