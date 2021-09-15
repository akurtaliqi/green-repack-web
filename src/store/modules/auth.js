import HTTP from "../../http-common/http-common";
import {
  LOGINBUYERACTION,
  LOGINSELLERACTION,
  LOGINADMINACTION,
  LOGOUTUSER,
  LOGINUSERFROMLOCALSTORAGE,
  LOGINUSERSUCCESS,
  LOGINUSERFAILED,
  LOGOUTUSERSUCCESS,
  AUTHGETTER,
  USERLOGGEDINGETTER,
  USERLOGGEDINTYPE
} from "../constants";
// State object
const state = {
  auth: false,
  userLoggedIn: {},
  userLogginError: {},
  userLoggedInType: ""
};
// Getter functions
const getters = {
  [AUTHGETTER]: state => {
    return state.auth;
  },
  [USERLOGGEDINGETTER]: state => {
    return state.userLoggedIn;
  },
  [USERLOGGEDINTYPE]: state => {
    return state.userLoggedInType;
  }
};
// Mutations
const mutations = {
  [LOGINUSERSUCCESS]: (state, payload) => {
    state.auth = true;
    state.userLogginError = {};
    state.userLoggedInType = payload.userType;
    localStorage.setItem("token", JSON.stringify(payload));
    delete payload.userType;
    state.userLoggedIn = payload;
  },
  [LOGINUSERFAILED]: (state, payload) => {
    state.auth = false;
    state.userLoggedIn = {};
    state.userLogginError = payload;
  },
  [LOGOUTUSERSUCCESS]: state => {
    state.auth = false;
    state.userLoggedIn = {};
    state.userLogginError = {};
  }
};
// Actions
const actions = {
  [LOGINBUYERACTION]: async ({ commit }, { email, password }) => {
    try {
      const response = await HTTP.post("/buyer/auth/login", {
        email,
        password
      });
      if (response.status === 200) {
        response.data.userType = "buyer";
        commit(LOGINUSERSUCCESS, response.data);
        return true;
      }
    } catch (error) {
      console.log(error.response);
      commit(LOGINUSERFAILED, error.response.data);
      return false;
    }
  },
  [LOGINSELLERACTION]: async ({ commit }, { email, password }) => {
    try {
      const response = await HTTP.post("/seller/auth/login", {
        email,
        password
      });
      if (response.status === 200) {
        response.data.userType = "seller";
        commit(LOGINUSERSUCCESS, response.data);
        return true;
      }
    } catch (error) {
      console.log(error.response);
      commit(LOGINUSERFAILED, error.response.data);
      return false;
    }
  },
  [LOGINADMINACTION]: async ({ commit }, { username, password }) => {
    try {
      const response = await HTTP.post("/admin/auth/login", {
        username,
        password
      });
      if (response.status === 200) {
        response.data.userType = "admin";
        commit(LOGINUSERSUCCESS, response.data);
        return true;
      }
    } catch (error) {
      console.log(error.response);
      commit(LOGINUSERFAILED, error.response.data);
      return false;
    }
  },
  [LOGOUTUSER]: ({ commit }) => {
    commit(LOGOUTUSERSUCCESS);
    localStorage.removeItem("token");
    localStorage.removeItem("randid");
    return true;
  },
  [LOGINUSERFROMLOCALSTORAGE]: ({ commit }, payload) => {
    console.log(payload);
    if (payload) {
      commit(LOGINUSERSUCCESS, payload);
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
