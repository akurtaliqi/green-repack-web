import http from '../http-common/http-common';

class ProductServices {
  getAll() {
    return http.get("/product");
  }
}

export default new ProductServices();