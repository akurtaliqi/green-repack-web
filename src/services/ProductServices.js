import http from '../http-common/http-common';

class ProductServices {
  getAll () {
    return http.get("/product");
  }

  get (id) {
    return http.get(`/product/${id}`);
  }
}

export default new ProductServices();