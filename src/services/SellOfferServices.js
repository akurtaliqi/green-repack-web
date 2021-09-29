import http from '../http-common/http-common';

class SellOfferServices {
  getAll () {
    return http.get("/selloffer");
  }

  getAllBySellerId (id) {
    return http.get(`/selloffer/seller/${id}`);
  }

  get (id) {
    return http.get(`/selloffer/${id}`);
  }

  createSellOffer (data) {
    return http.post(`/selloffer`, data);
  }

  update(id, data) {
    return http.put(`/selloffer/${id}`, data);
  }

  delete(id) {
    return http.delete(`/selloffer/${id}`);
  }
}

export default new SellOfferServices();