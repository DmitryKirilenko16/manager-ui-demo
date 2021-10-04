export enum EStatusCodes {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 460,
  BAD_REQUEST = 400,
  INTERNAL_SERVER = 500,
}

export const FORBIDDEN_ERROR_MESSAGE = 'The resource is forbidden for visitors.'
