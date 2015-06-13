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

    this.productApi = $resource('http://10.251.0.39:5000/api/product/all');

  }

  read() {
    return this.productApi.get().$promise;
  }

  addProduct(product) {
    return this.fileApi.addProduct({path: 'api/product',product: product}).$promise;
  }

}

component.service('apiService', apiService);
