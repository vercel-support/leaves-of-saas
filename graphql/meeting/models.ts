import { Dayjs } from 'dayjs';
import { IGroup } from 'graphql/groups';
import { IMeetingResponse } from 'graphql/meetingResponse';

// incoming from fauna db

export interface IUpdateMeetingResponse {
  updateMeeting: IMeeting;
}

export interface ICreateMeetingResponse {
  createMeeting: IMeeting;
}

export interface IFindMeetingByIdResponse {
  findMeetingByID: IMeeting;
}

export interface IDeleteMeetingResponse {
  deleteMeeting: IMeeting;
}

// leaves of saas response

export interface IMeeting {
  _id?: string;
  startDateTime?: Dayjs;
  endDateTime?: Dayjs;
  description?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  group?: IGroup;
  readings?: any[];
  attendance?: IMeetingResponsePage;
}

export interface IMeetingInput {
  startDateTime: Dayjs;
  endDateTime: Dayjs;
  description: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  group: string;
}

export interface IMeetingResponsePage {
  data?: IMeetingResponse[];
  after?: string;
  before?: string;
}
