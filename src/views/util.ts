import { User } from "../types";
import moment from "moment";

export const formatDateFieldsInUserObject = (user: User) => {
    return {
        ...user,
        isAdmin: user.isAdmin ? "Admin" : "Regular",
        birthdate: moment(user.birthdate).format("YYYY-MM-DD"),
        createdAt: moment(user.createdAt).format(
          "YYYY-MM-DD HH:mm A"
        ),
        updatedAt: moment(user.updatedAt).format(
          "YYYY-MM-DD HH:mm A"
        ),
    }
}

export const validationRules = {
  name: [
    (name: string) => !!name || "Name is required"
  ],
  email: [
    (email: string) => !!email || "E-mail is required",
    (email: string) => /.+@.+\..+/.test(email) || "E-mail must be valid",
  ],
  title: [
    (title: string) => !!title || "Title is required"
  ],
  birthdate: [(birthdate: string) => !!birthdate || "Birthdate is required"],
  role: [(role: string) => !!role || "Role is required"],
}