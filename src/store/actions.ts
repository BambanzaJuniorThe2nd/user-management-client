import { wrapActions } from "./util";
import { Users } from "../services";
import router from "../router";
import { MutationType } from "../types";
import {
  DEFAULT_SIGNED_IN_PAGE,
  DEFAULT_SIGNED_OUT_PAGE,
} from "../router/defaults";

const actions = wrapActions({
  async getAllUsers({ commit }) {
    const users = await Users.getAllUsers();
    commit(MutationType.SET_USERS, users);
  },
  async updateOtherUser(
    { commit, state },
    {
      _id,
      name,
      email,
      password,
      title,
      birthdate,
    }: {
      _id: string;
      name: string;
      email: string;
      password: string;
      title: string;
      birthdate: Date;
    }
  ) {
    const updatedUser = await Users.updateUser(_id, {
      name,
      email,
      password,
      title,
      birthdate,
    });
    if (updatedUser) {
      await Users.getAllUsers();
    }
  },
  async createUser(
    { commit },
    {
      name,
      email,
      password,
      title,
      birthdate,
    }: {
      name: string;
      email: string;
      password: string;
      title: string;
      birthdate: Date;
    }
  ) {
    const user = await Users.createUser({
      name,
      email,
      password,
      title,
      birthdate,
    });
    await Users.login({ email, password });
    commit(MutationType.SET_USER, user);

    if (user) {
      router.push({ name: DEFAULT_SIGNED_IN_PAGE });
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
      MutationType.UNSET_USERS,
      MutationType.UNSET_MESSAGE,
    ].forEach((mutation) => commit(mutation));
  },
});

export default actions;
