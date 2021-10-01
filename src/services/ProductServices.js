import http from '../http-common/http-common';

class ProductServices {
  getAll () {
    return http.get("/product");
  }

  getAllProductsToValidate () {
    return http.get("/product/validate");
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

  update(id, data) {
    return http.put(`/product/${id}`, data);
  }

  updateSent(id, data) {
    return http.put(`/product/sent/${id}`, data);
  }
}

export default new ProductServices();