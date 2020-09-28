import { IPagedResponse } from 'graphql/models';

// incoming from fauna db
export interface IFaunaGroupPagedResponse {
  groups: IGroupResponse;
}

export interface IFindGroupsByNamePagedResponse {
  findGroupByName: IGroupResponse;
}

export interface IUpdateGroupResponse {
  updateGroup: IGroup;
}

export interface ICreateGroupResponse {
  createGroup: IGroup;
}

export interface IFindGroupByIdResponse {
  findGroupByID: IGroup;
}

export interface IDeleteGroupResponse {
  deleteGroup: IGroup;
}

// leaves of saas response
export interface IGroupResponse {
  data: {
    groups: IPagedResponse<IGroup>;
  };
}

export interface IGroup extends IGroupInput {
  _id: string;
}

export interface IGroupInput {
  name: string;
  isInPublicDirectory: boolean;
}
