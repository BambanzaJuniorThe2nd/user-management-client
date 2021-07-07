import { GetterTree } from "vuex";
import { AppState } from "../types";
import moment from 'moment';

const getters: GetterTree<AppState, AppState> = {
    usersDataFormatted: ({ users }) => {
        return users.map(user => {
            return {
                ...user,
                birthdate: moment(user.birthdate).format("ddd MMM DD, YYYY"),
                createdAt: moment(user.createdAt).format("ddd MMM DD, YYYY [at] HH:mm a"),
                updatedAt: moment(user.updatedAt).format("ddd MMM DD, YYYY [at] HH:mm a"),
            }
        });
    }
};

export default getters;
