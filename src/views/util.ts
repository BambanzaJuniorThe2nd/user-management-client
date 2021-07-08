import { User } from "../types";
import moment from "moment";

export const formatDateFieldsInUserObject = (user: User) => {
    return {
        ...user,
        birthdate: moment(user.birthdate).format("ddd MMM DD, YYYY"),
        createdAt: moment(user.createdAt).format(
          "ddd MMM DD, YYYY [at] HH:mm a"
        ),
        updatedAt: moment(user.updatedAt).format(
          "ddd MMM DD, YYYY [at] HH:mm a"
        ),
    }
}