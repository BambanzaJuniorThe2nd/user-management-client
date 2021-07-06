import axios from "axios";
import {
  LoginResult,
  User,
  UserCreateArgs,
  UserLoginArgs,
  UserPutArgs,
} from "../types";
import { Auth } from "@/services";

export const Users = {
  async createUser(args: UserCreateArgs) {
    const res = await axios.post<User>("/users", args);
    return res.data;
  },
  async login(args: UserLoginArgs) {
    const res = await axios.post<LoginResult>(`/users/login`, args);
    Auth.setAccessToken(res.data.token);
    return res.data.user;
  },
  async getAllUsers() {
    const res = await axios.get<User>("/users/all");
    return res.data;
  },
  async getCurrentUser() {
    const res = await axios.get<User>("/users/me");
    return res.data;
  },
  async getUser(userId: string) {
    const res = await axios.get<User>(`/users/${userId}`);
    return res.data;
  },
  async updateUser(userId: string, args: UserPutArgs) {
    const res = await axios.put<User>(`/users/${userId}`, args);
    return res.data;
  },
  async logout() {
    Auth.deleteAccessToken();
    return;
  },
};
