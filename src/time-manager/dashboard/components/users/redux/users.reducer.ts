import { IAction } from 'react-core/core.types'
import { USERS_INITIAL_STATE } from './users.constants'
import { UsersState } from '../users.types'
import {
    CLEAR_CACHED_USER, CLEAR_USER_PROJECTS,
    userGetAction, userProjectsFetchAction,
    usersFetchAction,
    userUpdateAction,
} from './users.actions'

export const usersReducer = (
    state: UsersState = USERS_INITIAL_STATE,
    action: IAction
): UsersState => {
    switch (action?.type) {
    case usersFetchAction.successActionType: {
        return {
            ...state,
            list: action.payload[0],
            totalUsersCount: action.payload[1],
        }
    }

    case userUpdateAction.successActionType: {
        return {
            ...state,
            user: action.payload,
        }
    }

    case userGetAction.successActionType:
        return { ...state, user: action.payload }

    case CLEAR_CACHED_USER: {
        return {
            ...state,
            user: null,
        }
    }

    case userProjectsFetchAction.successActionType:
        return {...state, userProjects: action.payload}

    case CLEAR_USER_PROJECTS:
        return { ...state, userProjects: null }

    default:
        return state
    }
}
