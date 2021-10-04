import {
    USER_FETCH_ACTION_REQUEST_ID,
    USER_GET_ACTION_REQUEST_ID,
    USER_PROJECT_DELETE_ACTION_REQUEST_ID,
    USER_PROJECTS_FETCH_ACTION_REQUEST_ID,
    USER_UPDATE_ACTION_REQUEST_ID,
    userGetAction,
    userProjectDeleteAction,
    userProjectsFetchAction,
    usersFetchAction,
    userUpdateAction,
} from './redux/users.actions'
import { BEARER } from 'react-core/core.constants'
import { genericRequest } from 'react-core/fetch/fetch.call'
import { USER_UPDATE_API } from './redux/users.api.constants'
import {IUser} from './users.types'

export const fetchUsersList = (take: number = 10, skip: number = 0) => {
    return usersFetchAction.build(
        null,
        USER_FETCH_ACTION_REQUEST_ID,
        {},
        {},
        { take, skip }
    )
}

export const fetchUserProjects = (id: number) => {
    return userProjectsFetchAction.build(
        null,
        USER_PROJECTS_FETCH_ACTION_REQUEST_ID,
        {},
        { id }
    )
}

export const deleteUserProject = (id: number, userId: number) => {
    return userProjectDeleteAction.build(
        null,
        USER_PROJECT_DELETE_ACTION_REQUEST_ID,
        {},
        { id },
        {},
        {id: userId}
    )
}

export const updateUserRequest = (body: any, id: number, token: string) => {
    return genericRequest(
        USER_UPDATE_API.url,
        USER_UPDATE_API.method,
        { ...USER_UPDATE_API.headers, Authorization: `${BEARER} ${token}` },
        {},
        { id },
        JSON.stringify({ body })
    )
}

export const updateUser = (id: number, body: IUser) => {
    return userUpdateAction.build(
        { ...body },
        USER_UPDATE_ACTION_REQUEST_ID,
        {},
        { id }
    )
}

export const getUser = (id: number) => {
    return userGetAction.build(null, USER_GET_ACTION_REQUEST_ID, {}, { id })
}
