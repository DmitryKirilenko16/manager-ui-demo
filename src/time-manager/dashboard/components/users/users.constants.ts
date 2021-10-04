import { HttpMethods, IRequestModel } from 'react-core/fetch/fetch.types'

export const ENDPOINT = '/posts'

export const GET_POSTS: IRequestModel = {
    url: `${ENDPOINT}`,
    method: HttpMethods.GET,
}

export const USERS_UPDATE_ACTION = 'User was updated'

export const USER_PROJECT_CREATION_SUCCESS = 'Project was created'
export const USER_PROJECT_DELETING_SUCCESS = 'Project was deleted'
export const USER_PROJECT_UPDATING_SUCCESS = 'Project was updated'
