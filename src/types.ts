export interface User {
  _id: string;
  name: string;
  email: string;
  title: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserResult {
  user: User;
}

export interface CreateUserResult extends GetUserResult {}

export interface GetCurrentUserResult extends GetUserResult {}

export interface UpdateUserResult extends GetUserResult {}

export interface LoginResult {
  user: User;
  token: string;
}

export interface GetAllUsersResult {
  users: User[];
}

export interface UserCreateArgs {
  name: string;
  email: string;
  title: string;
  birthdate: Date;
  password: string;
}

export interface UserLoginArgs {
  email: string;
  password: string;
}

export type UserPutArgs = UserCreateArgs;

export interface AppMessage {
  type: string;
  message: string;
}

export interface AppState {
  user?: User;
  users: User[];
  message: AppMessage;
}

export enum MutationType {
  ADD_USER = "addUser",
  SET_USER = "setUser",
  SET_USERS = "setUsers",
  SET_MESSAGE = "setMessage",
  UNSET_MESSAGE = "unsetMessage",
  UNSET_USER = "unsetUser",
  UNSET_USERS = "unsetUsers",
}
