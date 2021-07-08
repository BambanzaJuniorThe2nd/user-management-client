import { User } from "../types";
import moment from "moment";

export const formatDateFieldsInUserObject = (user: User) => {
    return {
        ...user,
        birthdate: moment(user.birthdate).format("YYYY-MM-DD"),
        createdAt: moment(user.createdAt).format(
          "YYYY-MM-DD [at] HH:mm a"
        ),
        updatedAt: moment(user.updatedAt).format(
          "YYYY-MM-DD [at] HH:mm a"
        ),
    }
}