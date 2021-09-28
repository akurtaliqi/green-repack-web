import HTTP from "../../http-common/http-common";
import {
  CREATE_PRODUCT_ACTION,
  PRODUCTCREATEDSUCCESS,
  PRODUCTCREATIONFAILED,
  PRODUCTCREATED,
  PRODUCTCREATIONERROR
} from "../constants";
const state = {
  productCreated: null,
  productCreationError: null
};
const getters = {
  [PRODUCTCREATED]: state => {
    return state.productCreated;
  },
  [PRODUCTCREATIONERROR]: state => {
    return state.productCreationError;
  }
};
const mutations = {
  [PRODUCTCREATEDSUCCESS]: (state, payload) => {
    state.productCreated = payload;
  },
  [PRODUCTCREATIONFAILED]: (state, payload) => {
    state.productCreationError = payload;
  }
};
const actions = {
  [CREATE_PRODUCT_ACTION]: async ({ commit }, payload) => {
    console.log(...payload);
    try {
      const response = await HTTP.post("/product", payload, {
        "Content-type": undefined
      });
      if (response.status === 201) {
        console.log("ici 1");
        console.log(response);
        console.log("ici 2");
        console.log(response.data);
        // response.data = "productId";
        console.log("ici 3");
        console.log(response.data);
        commit(PRODUCTCREATEDSUCCESS, response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      commit(PRODUCTCREATIONFAILED, error.response.data);
      return false;
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
