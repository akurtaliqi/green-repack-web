import http from '../http-common/http-common';

class SellOfferServices {
  getAll () {
    return http.get("/selloffer");
  }

  get (id) {
    return http.get(`/selloffer/${id}`);
  }

  createSellOffer (data) {
    return http.post(`/selloffer`, data);
  }
}

export default new SellOfferServices();