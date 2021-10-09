import HTTP from "../../http-common/http-common";
import store from '../../store'
import {
  LOGINBUYERACTION,
  LOGINSELLERACTION,
  LOGINADMINACTION,
  SIGNUPBUYERACTION,
  SIGNUPFAILED,
  LOGOUTUSER,
  LOGINUSERFROMLOCALSTORAGE,
  LOGINUSERSUCCESS,
  LOGINUSERFAILED,
  LOGOUTUSERSUCCESS,
  AUTHGETTER,
  USERLOGGEDINGETTER,
  USERLOGGEDINTYPE,
  SELLERID,
  USERPROFILE
} from "../constants";
import authHeader from "./auth-header";
// State object
const state = {
  auth: false,
  userLoggedIn: {},
  userLogginError: {},
  userLoggedInType: null,
  sellerId: null
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
  },
  [SELLERID]: state => {
    return state.sellerId;
  },
  [USERPROFILE]: state => {
    return state.userProfile;
  }
};
// Mutations
const mutations = {
  [LOGINUSERSUCCESS]: (state, payload) => {
    state.auth = true;
    state.userLogginError = {};
    state.userLoggedInType = payload.userType;
    state.sellerId = payload.sellerId;
    state.userType = payload.userType;
    localStorage.setItem("token", JSON.stringify(payload));
    localStorage.setItem("tokenTest", payload.token);
    localStorage.setItem("sellerId", payload.sellerId);
    localStorage.setItem("userType", payload.userType);
    
    // delete payload.userType;
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
    state.userType = null;
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
  [SIGNUPBUYERACTION]: async ({ commit }, { email, password }) => {
   //do something
  },
  [LOGINSELLERACTION]: async ({ commit }, { email, password }) => {
    try {
      const response = (await HTTP.post("/seller/auth/login", {
        email,
        password
      }));
      if (response.status === 200) {
        response.data.userType = "seller";
        console.log(response.data)
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
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("randid");
    return true;
  },
  [LOGINUSERFROMLOCALSTORAGE]: ({ commit }, payload) => {
    // console.log(payload);
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
