export interface IFindLinkByEmailAddressResponse {
  findLinkByEmail: ILink;
}

export interface IUpdateLinkResponse {
  updateLink: ILink;
}

export interface ICreateLinkResponse {
  createLink: ILink;
}

export interface IFindLinkByIdResponse {
  findLinkByID: ILink;
}

export interface IDeleteLinkResponse {
  deleteLink: ILink;
}

// leaves of saas response

export interface ILinkPostRelation {
  connect?: string;
  disconnect?: boolean;
}

export interface ILink extends ILinkQueryResult {
  _id: string;
}

export interface ILinkQueryResult {
  description?: string;
  image?: string;
  url: string;
  type?: string;
  siteName?: string;
  title?: string;
}

export interface ILinkInput extends ILinkQueryResult {
  post: ILinkPostRelation;
}
