import { Dayjs } from 'dayjs';

export enum Partner {
  GOODREADS,
}
// incoming from fauna db

export interface IUpdateMediaResponse {
  updateMedia: IMedia;
}

export interface ICreateMediaResponse {
  createMedia: IMedia;
}

export interface IFindMediaByIdResponse {
  findMediaByID: IMedia;
}

export interface IDeleteMediaResponse {
  deleteMedia: IMedia;
}

// leaves of saas response

export interface IMedia extends IMediaInput {
  _id: string;
}

export interface IMediaInput {
  name: string;
  author: string;
  imageUrl: string;
  publicationDate: Dayjs;
  partner: Partner;
  partnerId: string;
}
