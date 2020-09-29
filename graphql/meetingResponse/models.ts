import { IMeeting } from 'graphql/meeting';
import { IPagedResponse } from 'graphql/models';
import { IUser } from 'graphql/users';

// incoming from fauna db
export interface IMeetingResponsePagedResponse {
  meetingresponses: IMeetingResponseResponse;
}

export interface IFindMeetingResponsesByNamePagedResponse {
  findMeetingResponseByName: IMeetingResponseResponse;
}

export interface IUpdateMeetingResponseResponse {
  updateMeetingResponse: IMeetingResponse;
}

export interface ICreateMeetingResponseResponse {
  createMeetingResponse: IMeetingResponse;
}

export interface IFindMeetingResponseByIdResponse {
  findMeetingResponseByID: IMeetingResponse;
}

export interface IDeleteMeetingResponseResponse {
  deleteMeetingResponse: IMeetingResponse;
}

// leaves of saas response
export interface IMeetingResponseResponse {
  data: {
    meetingresponses: IPagedResponse<IMeetingResponse>;
  };
}

export interface IMeetingResponse {
  _id: string;
  user: IUser;
  isAttending: boolean;
  meeting: IMeeting;
}

export interface IMeetingResponseInput {
  user: string;
  isAttending: boolean;
  meeting: string;
}
