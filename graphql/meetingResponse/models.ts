import { IPagedResponse } from 'graphql/models';

// incoming from fauna db
export interface IFaunaMeetingResponsePagedResponse {
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

export interface IMeetingResponse extends IMeetingResponseInput {
  _id: string;
}

export interface IMeetingResponseInput {
  name: string;
  isInPublicDirectory: boolean;
}
