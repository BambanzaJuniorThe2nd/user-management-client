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
  async getOtherUser({ commit }, userId: string) {
    const otherUser = await Users.getUser(userId);
    if (otherUser) {
      commit(MutationType.SET_OTHER_USER, otherUser);
    }
  },
  async changePassword(
    { commit, state },
    { _id, password }: { _id: string; password: string }
  ) {
    await Users.changePassword(_id, { password });
    commit(MutationType.SET_MESSAGE, {
      type: "success",
      message: "Password successfully changed",
    });
    commit(MutationType.SET_USER, { ...state.user });
  },
  async resetUserPassword({ commit, dispatch }, userId: string) {
    await Users.resetPassword(userId);
    commit(MutationType.SET_MESSAGE, {
      type: "success",
      message: "Password successfully reset",
    });
    dispatch("getAllUsers");
  },
  async updateOtherUser(
    { commit, dispatch },
    {
      _id,
      name,
      email,
      title,
      birthdate,
      isAdmin,
    }: {
      _id: string;
      name: string;
      email: string;
      title: string;
      birthdate: string;
      isAdmin: boolean;
    }
  ) {
    const updatedUser = await Users.updateUser(_id, {
      name,
      email,
      title,
      birthdate,
      isAdmin,
    });
    if (updatedUser) {
      commit(MutationType.SET_MESSAGE, {
        type: "success",
        message: "User successfully updated",
      });
      dispatch("getAllUsers");
    }
  },
  async deleteOtherUser({ commit, dispatch }, userId: string) {
    await Users.deleteUser(userId);
    commit(MutationType.SET_MESSAGE, {
      type: "success",
      message: "User successfully deleted",
    });
    dispatch("getAllUsers");
  },
  async createUser(
    { commit },
    {
      name,
      email,
      title,
      birthdate,
      isAdmin,
    }: {
      name: string;
      email: string;
      title: string;
      birthdate: string;
      isAdmin: boolean;
    }
  ) {
    const user = await Users.createUser({
      name,
      email,
      title,
      birthdate,
      isAdmin,
    });
    if (user) {
      commit(MutationType.ADD_USER, user);
      commit(MutationType.SET_MESSAGE, {
        type: "success",
        message: "User successfully added",
      });
    }
  },
  async logUserIn(
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
  async logUserOut({ dispatch }) {
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
