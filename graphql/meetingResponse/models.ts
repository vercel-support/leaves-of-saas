import { ID, IPagedResponse } from 'graphql/models';

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
  findMeetingResponseByID: {
    _id: ID;
    user: { _id: ID };
    isAttending: boolean;
    meeting: { _id: ID };
  };
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
  _id?: ID;
  user?: ID;
  isAttending?: boolean;
  meeting?: ID;
}

export interface IMeetingResponseInput {
  user: ID;
  isAttending: boolean;
  meeting: ID;
}
