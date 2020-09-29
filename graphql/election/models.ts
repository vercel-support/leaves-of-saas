import { Dayjs } from 'dayjs';
import { IGroup } from 'graphql/groups';

// incoming from fauna db

export interface IUpdateElectionResponse {
  updateElection: IElection;
}

export interface ICreateElectionResponse {
  createElection: IElection;
}

export interface IFindElectionByIdResponse {
  findElectionByID: IElection;
}

export interface IDeleteElectionResponse {
  deleteElection: IElection;
}

// leaves of saas response

export interface IElection {
  _id?: string;
  startDateTime?: Dayjs;
  endDateTime?: Dayjs;
  group?: IGroup;
  nominations?: any;
}

export interface IElectionInput {
  startDateTime: Dayjs;
  endDateTime: Dayjs;
  description: string;
  group: string;
}
