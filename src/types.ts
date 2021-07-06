export interface User {
  _id: string;
  name: string;
  email: string;
  title: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResult {
  user: User;
  token: string;
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
  SET_USERS = "setUser",
  UNSET_MESSAGE = "unsetMessage",
  UNSET_USER = "unsetUser",
  UNSET_USERS = "unsetUsers",
}
