import {HttpMethods, IRequestModel} from 'react-core/fetch/fetch.types'

export const USERS_ENDPOINT = '/users'
export const USER_PROJECTS_ENDPOINT = '/user-projects'

export const USERS_FETCH_API: IRequestModel = {
    url: `${USERS_ENDPOINT}`,
    method: HttpMethods.GET,
}

export const USER_UPDATE_API: IRequestModel = {
    url: `${USERS_ENDPOINT}/{id}`,
    method: HttpMethods.PUT,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const USER_GET_API: IRequestModel = {
    url: `${USERS_ENDPOINT}/{id}`,
    method: HttpMethods.GET
}

export const USER_PROJECTS_FETCH_API: IRequestModel = {
    url: `${USERS_ENDPOINT}/{id}${USER_PROJECTS_ENDPOINT}`,
    method: HttpMethods.GET
}

export const USER_PROJECT_CREATE_API: IRequestModel = {
    url: `${USERS_ENDPOINT}/{id}${USER_PROJECTS_ENDPOINT}`,
    method: HttpMethods.POST,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const USER_PROJECT_DELETE_API: IRequestModel = {
    url: `${USERS_ENDPOINT}${USER_PROJECTS_ENDPOINT}/{id}`,
    method: HttpMethods.DELETE,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const USER_PROJECT_UPDATE_API: IRequestModel = {
    url: `${USERS_ENDPOINT}${USER_PROJECTS_ENDPOINT}/{id}`,
    method: HttpMethods.PUT,
    headers: {
        'Content-Type': 'application/json',
    }
}

