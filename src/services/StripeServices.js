import http from '../http-common/http-common';

class StripeServices {

  createSession (id) {
    return http.get(`/order/${id}`);
  }

  createPrice (data) {
    return http.post("/order", data);
  }

  createProduct (id, data) {
    return http.put(`/order/${id}`, data);
  }

  createPaymentIntent (id, data) {
    return http.put(`/order/${id}`, data);
  }
}

export default new StripeServices();