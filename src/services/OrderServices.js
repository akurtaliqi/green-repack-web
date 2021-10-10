import http from '../http-common/http-common';

class OrderServices {
  getAll () {
    return http.get("/order");
  }

  get (id) {
    return http.get(`/order/${id}`);
  }

  create(data) {
    return http.post("/order", data);
  }

  update(id, data) {
    return http.put(`/order/${id}`, data);
  }
}

export default new OrderServices();