export interface User {
  _id: string;
  name: string;
  email: string;
  title: string;
  birthdate: Date;
  isAdmin: boolean;
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
  birthdate: string;
  isAdmin: boolean;
}

export interface UserLoginArgs {
  email: string;
  password: string;
}

export interface ChangePasswordArgs {
  password: string;
}

export type UserPutArgs = UserCreateArgs;

export interface AppMessage {
  type: string;
  message: string;
}

export interface AppState {
  user?: User;
  otherUser?: User;
  users: User[];
  message: AppMessage;
}

export enum MutationType {
  ADD_USER = "addUser",
  SET_USER = "setUser",
  UNSET_USER = "unsetUser",
  SET_OTHER_USER = "setOtherUser",
  UNSET_OTHER_USER = "unsetOtherUser",
  SET_USERS = "setUsers",
  UNSET_USERS = "unsetUsers",
  SET_MESSAGE = "setMessage",
  UNSET_MESSAGE = "unsetMessage",
}
