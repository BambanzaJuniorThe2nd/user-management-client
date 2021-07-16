import { GetterTree } from "vuex";
import { AppState } from "../types";
import { formatDateFieldsInUserObject } from "../views/util";

const getters: GetterTree<AppState, AppState> = {
  usersDataFormatted: ({ users }) => {
    console.log("users in getter usersDataFormatted: ", users);
    return users.map((user) => formatDateFieldsInUserObject(user));
  },
  userDataFormatted: ({ otherUser }) => {
    if (otherUser) {
      return formatDateFieldsInUserObject(otherUser);
    }
  }
};

export default getters;
