import HTTP from "../../http-common/http-common";
import store from '../../store'
import {
  LOGINBUYERACTION,
  LOGINSELLERACTION,
  LOGINADMINACTION,
  SIGNUPBUYERACTION,
  SIGNUPSELLERACTION,
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
  USERPROFILE,
  BUYERID,
  SIGNUPSUCCESS
} from "../constants";
import authHeader from "./auth-header";
// State object
const state = {
  auth: false,
  userLoggedIn: {},
  userLogginError: {},
  userLoggedInType: null,
  sellerId: null,
  buyerId: null,
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
  [BUYERID]: state => {
    return state.buyerId;
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
    state.buyerId = payload.buyerId;
    state.userType = payload.userType;
    localStorage.setItem("token", JSON.stringify(payload));
    localStorage.setItem("tokenTest", payload.token);
    localStorage.setItem("sellerId", payload.sellerId);
    localStorage.setItem("buyerId", payload.buyerId);
    localStorage.setItem("userType", payload.userType);

    console.log(JSON.stringify(payload))
    
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
  },
  [SIGNUPSUCCESS]: state => {
    state.auth = false;
    
  },
  [SIGNUPFAILED]: state => {
    state.auth = false;
  },
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
  [SIGNUPSELLERACTION]: async ({ commit }, { email, password }) => {
    try {
      const response = (await HTTP.post("/seller/auth/signup", {
        email,
        password
      }));
      if (response.status === 200) {
        // response.data.userType = "seller";
        console.log(response.data)
        commit(SIGNUPSUCCESS, response.data);
        
        return true;
      }
    } catch (error) {
      console.log(error.response);
      commit(SIGNUPFAILED, error.response.data);
      return false;
    }
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
