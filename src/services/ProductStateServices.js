import http from '../http-common/http-common';

class ProductStateServices {
  getAll () {
    return http.get("/productState");
  }
}

export default new ProductStateServices();