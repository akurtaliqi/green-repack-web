import http from '../http-common/http-common';

class GreenCoinServices {
  getAll () {
    return http.get("/greencoin");
  }

  get (id) {
    return http.get(`/greencoin/${id}`);
  }

  create(data) {
    return http.post("/greencoin", data);
  }

  update(id, data) {
    return http.put(`/greencoin/${id}`, data);
  }
}

export default new GreenCoinServices();