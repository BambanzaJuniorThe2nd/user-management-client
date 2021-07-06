import Vue from "vue";
import Vuex from "vuex";
import { AppState } from "../types";
import mutations from "./mutations";

Vue.use(Vuex);

const state: AppState = {
  user: undefined,
  users: [],
  message: { type: "", message: "" },
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {},
});
