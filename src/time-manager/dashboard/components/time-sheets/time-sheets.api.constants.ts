import { HttpMethods, IRequestModel } from 'react-core/fetch/fetch.types'

export const TIME_SHEETS_ENDPOINT = '/time-sheets'

export const TIME_SHEETS_FETCH_API: IRequestModel = {
    url: `${TIME_SHEETS_ENDPOINT}`,
    method: HttpMethods.GET,
}

export const TIME_SHEET_CREATE_API: IRequestModel = {
    url: `${TIME_SHEETS_ENDPOINT}`,
    method: HttpMethods.POST,
    headers: {
        'Content-Type': 'application/json',
    },
}

export const TIME_SHEET_DELETE_API: IRequestModel = {
    url: `${TIME_SHEETS_ENDPOINT}/{id}`,
    method: HttpMethods.DELETE,
    headers: {
        'Content-Type': 'application/json',
    },
}

export const TIME_SHEET_UPDATE_API: IRequestModel = {
    url: `${TIME_SHEETS_ENDPOINT}/{id}`,
    method: HttpMethods.PUT,
    headers: {
        'Content-Type': 'application/json',
    },
}
