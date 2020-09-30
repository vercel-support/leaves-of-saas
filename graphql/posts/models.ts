import dayjs, { Dayjs } from 'dayjs';
import { ID, IPagedResponse } from 'graphql/models';
import { IGroup } from 'graphql/groups';
import { ILink } from 'graphql/links';
import { INudge } from 'graphql/nudge';
import { IUser } from 'graphql/users';
import { ILinkInput } from 'graphql/links/models';
import { faunaNudgeToNudge, IFaunaNudge } from 'graphql/nudge/models';

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

export interface IDeletePostResponse {
  deletePost: IPost;
}

// leaves of saas response
export interface IPostResponse {
  data: {
    posts: IPagedResponse<IPost>;
  };
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
  create?: ILinkInput;
}

export interface IPost {
  _id?: string;
  reading?: ID;
  text?: string;
  date?: Dayjs;
  link?: ILink;
  replies?: IPost[]; // this is an array of ids
  nudges?: INudge[]; //
  group?: ID;
  user?: IUser;
}

export interface IPostInput {
  reading?: ID;
  text: string;
  date: Dayjs;
  link?: IPostLinkRelation;
  group: ID;
  user: ID;
  replyTo?: ID;
}

export interface IFaunaPostInput {
  reading?: { connect: ID };
  text: string;
  date: string;
  link?: IPostLinkRelation;
  group: { connect: ID };
  user: { connect: ID };
  replyTo?: { create: { reply: { connect: ID } } };
}

export interface IFaunaPost {
  _id: ID;
  text: string;
  date: string;
  link?: ILink;
  replies: { data: { reply: IFaunaPost }[] };
  nudges: { data: IFaunaNudge[] };
  user: IUser;
  reading?: any;
  group: IGroup;
}

export interface IFindPostByIdResponse {
  findPostByID: IFaunaPost;
}

export const faunaPostToPost = (faunaPost: IFaunaPost): IPost => ({
  ...faunaPost,
  date: dayjs(faunaPost.date),
  replies: faunaPost.replies.data.map((fp: { reply: IFaunaPost }) =>
    faunaPostToPost(fp.reply)
  ),
  reading: faunaPost.reading?._id,
  nudges: faunaPost.nudges.data.map(faunaNudgeToNudge),
  group: faunaPost.group._id,
});

export const postInputToFaunaPostInput = (
  postInput: IPostInput
): IFaunaPostInput => ({
  reading: postInput.reading && { connect: postInput.reading },
  user: { connect: postInput.user },
  text: postInput.text,
  date: dayjs(postInput.date).toISOString(),
  link: postInput.link,
  group: { connect: postInput.group },
  replyTo: postInput.replyTo && {
    create: { reply: { connect: postInput.replyTo } },
  },
});
