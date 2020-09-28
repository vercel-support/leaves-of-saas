// incoming from fauna db

import { Dayjs } from 'dayjs';

export interface ICreateRefreshTokenResponse {
  createRefreshToken: IRefreshToken;
}

export interface IFindRefreshTokenByIdResponse {
  findRefreshTokenByID: IRefreshToken;
}

export interface IDeleteRefreshTokenResponse {
  deleteRefreshToken: IRefreshToken;
}

// leaves of saas response

export interface IRefreshToken {
  _id: string;
  token: string;
  expirationDate: Dayjs;
}

export interface IRefreshTokenInput {
  user: string;
}
