import http from '../http-common/http-common';

class WarehouseServices {
  getAll () {
    return http.get("/warehouse");
  }
}

export default new WarehouseServices();