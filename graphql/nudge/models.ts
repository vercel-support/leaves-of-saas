import { ID } from 'graphql/models';
import { IFaunaPost } from 'graphql/posts/models';
import { IUser } from 'graphql/users';
export enum NudgeDirection {
  UP,
  DOWN,
}

// incoming from fauna db

export interface ICreateNudgeResponse {
  createNudge: INudge;
}

export interface IUpdateNudgeResponse {
  updateNudge: INudge;
}

export interface IFindNudgeByIdResponse {
  findNudgeByID: {
    _id: ID;
    user: { _id: ID };
    post: { _id: ID };
    direction: NudgeDirection;
  };
}

export interface IDeleteNudgeResponse {
  deleteNudge: INudge;
}

export interface IFaunaNudge {
  _id?: ID;
  user?: IUser;
  direction?: NudgeDirection;
  post?: IFaunaPost;
}

// leaves of saas response

export interface INudge {
  _id?: ID;
  user?: ID;
  direction?: NudgeDirection;
  post?: ID;
}

export interface INudgeInput {
  user: ID;
  direction: NudgeDirection;
  post: ID;
}

export const faunaNudgeToNudge = (faunaNudge: IFaunaNudge): INudge => ({
  ...faunaNudge,
  user: faunaNudge.user?._id,
  post: faunaNudge.post?._id,
});
