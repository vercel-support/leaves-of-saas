export interface IUpdateRoleResponse {
  updateRole: IRole;
}

export interface ICreateRoleResponse {
  createRole: IRole;
}

export interface IFindRoleByIdResponse {
  findRoleByID: IRole;
}

export interface IDeleteRoleResponse {
  deleteRole: IRole;
}

// leaves of saas response

export interface IRoleGroupRelation {
  connect?: string;
  disconnect?: boolean;
}

export interface IRole extends IRoleInput {
  _id: string;
}

export interface IRoleInput {
  name: string;
  group: IRoleGroupRelation;
}
