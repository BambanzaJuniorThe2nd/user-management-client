import { GetterTree } from "vuex";
import { AppState } from "../types";
import { formatDateFieldsInUserObject } from "../views/util";

const getters: GetterTree<AppState, AppState> = {
  usersDataFormatted: ({ users }) => {
    return users.map((user) => formatDateFieldsInUserObject(user));
  },
  userDataFormatted: ({ otherUser }) => {
    if (otherUser) {
      return formatDateFieldsInUserObject(otherUser);
    }
  },
  currentUserDataFormatted: ({ user }) => {
    if (user) {
      return formatDateFieldsInUserObject(user);
    }
  },
};

export default getters;
