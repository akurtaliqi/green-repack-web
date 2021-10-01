import http from '../http-common/http-common';

class ProductCategoryServices {
  getAll () {
    return http.get("/productCategory");
  }

  get (id) {
    return http.get(`/productCategory/${id}`);
  }
}

export default new ProductCategoryServices();