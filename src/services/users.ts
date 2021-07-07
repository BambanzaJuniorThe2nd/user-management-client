import axios from "axios";
import {
  LoginResult,
  UserCreateArgs,
  UserLoginArgs,
  UserPutArgs,
  CreateUserResult,
  GetCurrentUserResult,
  GetAllUsersResult,
  GetUserResult,
  UpdateUserResult,
} from "../types";
import { Auth } from "@/services";

export const Users = {
  async createUser(args: UserCreateArgs) {
    const res = await axios.post<CreateUserResult>("/users", args);
    return res.data;
  },
  async login(args: UserLoginArgs) {
    const res = await axios.post<LoginResult>(`/users/login`, args);
    Auth.setAccessToken(res.data.token);
    return res.data.user;
  },
  async getAllUsers() {
    const res = await axios.get<GetAllUsersResult>("/users/all");
    return res.data.users;
  },
  async getCurrentUser() {
    const res = await axios.get<GetCurrentUserResult>("/users/me");
    return res.data.user;
  },
  async getUser(userId: string) {
    const res = await axios.get<GetUserResult>(`/users/${userId}`);
    return res.data.user;
  },
  async updateUser(userId: string, args: UserPutArgs) {
    const res = await axios.put<UpdateUserResult>(`/users/${userId}`, args);
    return res.data.user;
  },
  async logout() {
    Auth.deleteAccessToken();
    return;
  },
};
