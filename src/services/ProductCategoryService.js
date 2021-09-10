import http from '../http-common/http-common';

class ProductCategoryServices {
  getAll () {
    return http.get("/productCategory");
  }
}

export default new ProductCategoryServices();