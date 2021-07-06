import { MutationTree } from "vuex";
import { AppState } from "../types";

const mutations: MutationTree<AppState> = {
  addUser(state, user) {
    state.users.push(user);
  },
  setUser(state, user) {
    state.user = user;
  },
  unsetUser(state) {
    state.user = undefined;
  },
  setMessage(state, message) {
    state.message = message;
  },
  unsetMessage(state) {
    state.message = { type: "", message: "" };
  },
};

export default mutations;
