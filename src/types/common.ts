export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IReviews {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICars {
  id: string;
  title?: string;
  name?: string;
  imgUrl?: string;
  description?: string;
  comments?: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;

  categoryId?: string | null[] | null | undefined;
  category?:
    | {
        title?: string;
        id?: string;
      }
    | undefined;
}

export interface IReservation {
  name: string | null;
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  maxCredit: number;
  minCredit: number;
  createdAt: string;
  updatedAt: string;
  user?: string;
  listing?: ICars;
  deletedAt?: null;
  userId: IUser;
  listingId?: ICars;
}
