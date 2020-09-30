export interface IPagedResponse<T> {
  data: T[];
  after: string | null;
  before: string | null;
}

export type ID = string;

export interface ICreateUpdateDeleteResponse {
  _id: ID;
}
