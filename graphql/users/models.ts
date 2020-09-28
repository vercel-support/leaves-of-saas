import { IRefreshToken } from 'graphql/refreshTokens';

// incoming from fauna db

export interface IFindUserByEmailAddressResponse {
  findUserByEmail: IUser;
}

export interface IUpdateUserResponse {
  updateUser: IUser;
}

export interface ICreateUserResponse {
  createUser: IUser;
}

export interface IFindUserByIdResponse {
  findUserByID: IUser;
}

export interface IDeleteUserResponse {
  deleteUser: IUser;
}

// leaves of saas response

export interface IUser extends IUserInput {
  _id: string;
  refreshTokens: { data: IRefreshToken[] };
}

export interface IUserInput {
  name: string;
  isInPublicDirectory: boolean;
}
