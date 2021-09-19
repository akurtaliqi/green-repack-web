import http from '../http-common/http-common';

class ProductServices {
  getAll () {
    return http.get("/product");
  }

  get (id) {
    return http.get(`/product/${id}`);
  }

  createProduct () {
    return http.post(`/product`);
  }
}

export default new ProductServices();