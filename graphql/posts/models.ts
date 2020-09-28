import { Dayjs } from 'dayjs';
import { IPagedResponse } from 'graphql/models';
import { IGroup } from 'graphql/groups';

// incoming from fauna db
export interface IPostPagedResponse {
  posts: IPostResponse;
}

export interface IUpdatePostResponse {
  updatePost: IPost;
}

export interface ICreatePostResponse {
  createPost: IPost;
}

export interface IFindPostByIdResponse {
  findPostByID: IPost;
}

export interface IDeletePostResponse {
  deletePost: IPost;
}

// leaves of saas response
export interface IPostResponse {
  data: {
    posts: IPagedResponse<IPost>;
  };
}

export interface IPost extends IPostInput {
  _id: string;
}

export interface IPostUserRelation {
  connect?: string;
  create?: any;
}

export interface IPostGroupRelation {
  connect?: string;
  create?: any;
}

export interface IPostReadingRelation {
  create?: any;
  connect?: string;
  disconnect?: boolean;
}

export interface IPostLinkRelation {
  create?: any;
  connect?: string;
  disconnect?: boolean;
}

export interface IPostInput {
  reading?: IPostReadingRelation;
  text: string;
  date: Dayjs;
  link?: IPostLinkRelation;
  replies?: string[]; // this is an array of ids
  nudges?: string[]; //
  group: IPostGroupRelation;
  user: IPostUserRelation;
}
