import { wrapActions } from "./util";
import { Users } from "../services";
import router from "../router";
import { MutationType } from "../types";
import {
  DEFAULT_SIGNED_IN_PAGE,
  DEFAULT_SIGNED_OUT_PAGE,
} from "../router/defaults";

const actions = wrapActions({
  async setMessage(
    { commit },
    { type, message }: { type: string; message: string }
  ) {
    commit("setMessage", {
      type,
      message,
    });
  },
  async getOtherUser({commit}, userId: string) {
    console.log("Inside getOtherUser: ", userId);
    const otherUser = await Users.getUser(userId);
    if (otherUser) {
      commit(MutationType.SET_OTHER_USER, otherUser);
    }
  },
  async updateOtherUser(
    { commit },
    {
      _id,
      name,
      email,
      title,
      birthdate,
    }: {
      _id: string;
      name: string;
      email: string;
      title: string;
      birthdate: Date;
    }
  ) {
    const updatedUser = await Users.updateUser(_id, {
      name,
      email,
      title,
      birthdate,
    });
    if (updatedUser) {
      commit(MutationType.SET_MESSAGE, {type: "success", message: "User successfully updated" });
      await Users.getAllUsers();
    }
  },
  async createUser(
    { commit, dispatch },
    {
      name,
      email,
      title,
      birthdate,
    }: {
      name: string;
      email: string;
      title: string;
      birthdate: Date;
    }
  ) {
    const user = await Users.createUser({
      name,
      email,
      title,
      birthdate,
    });
    if (user) {
      commit(MutationType.ADD_USER, user);
      commit(MutationType.SET_MESSAGE, {type: "success", message: "User successfully added" });
    }
  },
  async signUserIn(
    { commit },
    { email, password }: { email: string; password: string }
  ) {
    const user = await Users.login({ email, password });
    if (user) {
      commit(MutationType.SET_USER, user);
      if (router.currentRoute.name !== DEFAULT_SIGNED_IN_PAGE)
        router.push({ name: DEFAULT_SIGNED_IN_PAGE });
    }
  },
  async signUserOut({ dispatch }) {
    await Users.logout();
    dispatch("clearData");
    router.push({ name: DEFAULT_SIGNED_OUT_PAGE });
  },
  async getAllUsers({ commit }) {
    const users = await Users.getAllUsers();
    commit(MutationType.SET_USERS, users);
  },
  async getCurrentUser({ commit }) {
    const user = await Users.getCurrentUser();
    if (user) commit(MutationType.SET_USER, user);
  },
  async refreshData({ dispatch }) {
    ["getAllUsers"].forEach((action) => dispatch(action));
  },
  async resetMessage({ commit }) {
    commit(MutationType.UNSET_MESSAGE);
  },
  async clearData({ commit }) {
    [
      MutationType.UNSET_USER,
      MutationType.UNSET_OTHER_USER,
      MutationType.UNSET_USERS,
      MutationType.UNSET_MESSAGE,
    ].forEach((mutation) => commit(mutation));
  },
});

export default actions;
