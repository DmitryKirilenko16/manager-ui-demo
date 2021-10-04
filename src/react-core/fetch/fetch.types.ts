import { IAction } from '../core.types'

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

export const WITH_SPINNER = 'WITH_SPIN'
export const WITH_NO_SPINNER = 'NO_SPIN'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const SPINNER = 'SPINNER'
export const IMAGES = 'IMAGES'

export interface IRequestModel {
  url: string;
  method: HttpMethods;
  delay?: number;
  headers?: IRequestHeaders;
  responseType?: string;
}

export interface IResponseHeaders {
  xAuthToken?: string;
}

export interface IRequestHeaders {
  [key: string]: string;
}

export interface IPathVariable {
  [key: string]: string | number | undefined | null;
}

export interface IQueryParameter {
  [key: string]: string | number | boolean | undefined | null;
}

export interface ISuccessFetchAction extends IAction {
  meta: IFetchAction; // last fetch
}

export interface IFailureFetchAction extends ISuccessFetchAction {}

export interface IFetchActionMeta {
  requestModel: IRequestModel;
  queryParameter?: IQueryParameter;
  runTimeHeaders?: IRequestHeaders;
  pathVariable?: IPathVariable;
  successAction: (payload: unknown, meta: IFetchAction) => any;
  failureAction: (payload: unknown, meta: IFetchAction) => IFailureFetchAction;
  requestId: string | number;
  serverBaseUrl?: string;
  responseHeaders?: IResponseHeaders;
  responseStatusCode?: number;
  actions?: IAction[];
}

export interface IFetchAction {
  type: string;
  payload: any;
  meta: IFetchActionMeta;
}

export interface IActionFactoryReturn {
  build: (
    payload: any,
    requestId: string | number,
    runTimeHeaders?: IRequestHeaders,
    pathVariable?: IPathVariable,
    queryParameter?: IQueryParameter,
    meta?: object
  ) => IFetchAction;
  failureActionType: string;
  pendingActionType: string;
  pendingActionTypeWithSpinner: string;
  successActionType: string;
}

export interface IGenericRequestResponse<T = any> {
  status: number,
  response: Response,
  body: T | ReadableStream<Uint8Array> | null
  message?: string
}
