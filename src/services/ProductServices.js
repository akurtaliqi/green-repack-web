import http from '../http-common/http-common';

class ProductServices {
  getAll () {
    return http.get("/product");
  }

  get (id) {
    return http.get(`/product/${id}`);
  }

  createProduct(data) {
    return http.post("/product", data);
  }

  delete(id) {
    return http.delete(`/product/${id}`);
  }
}

export default new ProductServices();