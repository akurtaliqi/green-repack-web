import http from '../http-common/http-common';

class ProductServices {
  getAll () {
    return http.get("/product");
  }

  get (id) {
    return http.get(`/product/${id}`);
  }

  createProduct (id) {
    return http.post(`/`);
  }
}

export default new ProductServices();