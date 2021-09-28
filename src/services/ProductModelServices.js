import http from '../http-common/http-common';

class SellOfferServices {
  getAll () {
    return http.get("/productModel");
  }

  get (id) {
    return http.get(`/productModel/${id}`);
  }

  getProductModelByCategory (categoryId) {
    return http.get(`/productModel/category/${categoryId}`);
  }

  createSellOffer () {
    return http.post(`/productModel`);
  }
}

export default new SellOfferServices();