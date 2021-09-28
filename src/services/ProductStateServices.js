import http from '../http-common/http-common';

class ProductStateServices {
  getAll () {
    return http.get("/productState");
  }

  get (id) {
    return http.get(`/productState/${id}`);
  }
}

export default new ProductStateServices();