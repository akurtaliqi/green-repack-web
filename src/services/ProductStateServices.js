import http from '../http-common/http-common';

class ProductStateServices {
  getAll () {
    return http.get("/productState");
  }

  get (id) {
    return http.get(`/productState/${id}`);
  }

  createProductState(data) {
    return http.post("/productState", data);
  }

  update(id, data) {
    return http.put(`/productState/${id}`, data);
  }
}

export default new ProductStateServices();