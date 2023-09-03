import {setItem,removeItem } from "../helpers/persistenStorega";
// import { setItem } from "../helpers/persistenStorega"
import AuthService from "../service/auth";
import { gettersTypes } from "./types";
const state = {
  isLoading: false,
  user: null,
  errors: null,
  isLogged: null,
};
const getters = {
  [gettersTypes.currentUser]: (state) => {
    return state.user;
  },
  [gettersTypes.isLogged]: (state) => {
    return Boolean(state.isLogged);
  },
  [gettersTypes.isAnonymous]: (state) => {
    return state.isLogged === false;
  },
};
const mutations = {
  registerStart(state) {
    state.isLoading = true;
    state.user = null;
    state.errors = null;
    state.isLogged = null;
  },
  registerSucces(state, payload) {
    state.isLoading = false;
    state.user = payload;
    state.isLogged = true;
  },
  registerFailure(state, payload) {
    state.isLoading = false;
    state.errors = payload.errors;
    state.isLogged = false;
  },

  loginStart(state) {
    state.isLoading = true;
    state.user = null;
    state.errors = null;
    state.isLogged = null;
  },
  loginSucces(state, payload) {
    state.isLoading = false;
    state.user = payload;
    state.isLogged = true;
  },
  loginFailure(state, payload) {
    state.isLoading = false;
    state.errors = payload.errors;
    state.isLogged = false;
  },
  currentUserStart(state) {
    state.isLoading = true;
  },
  currentUserSuccess(state, payload) {
    state.isLoading = false;
    state.user = payload;
    state.isLogged = true;
  },
  currentUserFailure(state) {
    state.isLoading = false;
    state.user = null;
    state.isLogged = false;
  },
  logout(state) {
    state.user = null;
    state.isLogged = false;
  },
};

const actions = {
  register(context, user) {
    return new Promise((resolve, reject) => {
      context.commit("registerStart");
      AuthService.register(user)
        .then((response) => {
          context.commit("registerSucces", response.data.user);
          setItem("token", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((error) => {
          context.commit("registerFailure", error.response.data);
          reject(error.response.data);
        });
    });
  },
  login(context, user) {
    return new Promise((resolve, reject) => {
      context.commit("loginStart");
      AuthService.login(user)
        .then((response) => {
          context.commit("registerSucces", response.data.user);
          setItem("token", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((error) => {
          context.commit("registerFailure", error.response.data);
          reject(error.response.data);
        });
    });
  },
  getUser(context) {
    return new Promise((resolve) => {
      context.commit("currentUserStart");
      AuthService.getUser()
        .then((response) => {
          context.commit("currentUserSuccess", response.data.user);
          resolve(response.data.user);
        })
        .catch(() => context.commit("currentUserFailure"));
    });
  },
  logout(context) {
		context.commit('logout')
		removeItem('token')
	},
};

export default {
  state,
  mutations,
  actions,
  getters,
};
