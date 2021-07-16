import axios from "axios";
import {
  LoginResult,
  UserCreateArgs,
  UserLoginArgs,
  UserPutArgs,
  CurrentUserPutArgs,
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
    return res.data;
  },
  async getAllUsers() {
    const res = await axios.get<GetAllUsersResult>("/users/all");
    return res.data;
  },
  async getCurrentUser() {
    const res = await axios.get<GetCurrentUserResult>("/users/me");
    return res.data;
  },
  async getUser(userId: string) {
    const res = await axios.get<GetUserResult>(`/users/${userId}`);
    return res.data;
  },
  async updateCurrentUser(userId: string, args: CurrentUserPutArgs) {
    const res = await axios.put<UpdateUserResult>(`/users/${userId}`, args);
    return res.data;
  },
  async updateUser(userId: string, args: UserPutArgs) {
    const res = await axios.put<UpdateUserResult>(`/users/${userId}`, args);
    return res.data;
  },
  async deleteUser(userId: string) {
    await axios.delete(`/users/${userId}`);
    return;
  },
  async logout() {
    Auth.deleteAccessToken();
    return;
  },
};
