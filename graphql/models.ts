export interface IPagedResponse<T> {
  data: T[];
  after: string | null;
  before: string | null;
}

export interface ICreateUpdateDeleteResponse {
  _id: String;
}
