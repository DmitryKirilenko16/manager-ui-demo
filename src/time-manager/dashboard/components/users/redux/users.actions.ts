import { combineEpics, Epic } from 'redux-observable'

import { IActionFactoryReturn } from 'react-core/fetch/fetch.types'
import { fetchActionFactory } from 'react-core/fetch/fetch.action.factory'
import {
    USER_GET_API,
    USER_PROJECT_CREATE_API,
    USER_PROJECT_DELETE_API, USER_PROJECT_UPDATE_API,
    USER_PROJECTS_FETCH_API,
    USER_UPDATE_API,
    USERS_FETCH_API,
} from './users.api.constants'
import { switchMapFetchEpics } from 'react-core/fetch/fetch.call'
import { isActionInPending } from 'react-core/spinner/redux/spinner.reducers'
import {
    epicCreator,
    triggerSnackbarEpicCreator,
} from 'react-core/fetch/fetch.epic.creators'
import { store } from 'redux/app.store'
import {
    USER_PROJECT_CREATION_SUCCESS,
    USER_PROJECT_DELETING_SUCCESS, USER_PROJECT_UPDATING_SUCCESS,
    USERS_UPDATE_ACTION,
} from '../users.constants'
import { fetchUserProjects, getUser } from '../users.utils'
import { closeCurrentDialog } from 'shared/dialogs/redux/dialogs.actions'

export const USERS_FETCH_ACTION_TYPE = 'USERS_FETCH_ACTION_TYPE'
export const USER_FETCH_ACTION_REQUEST_ID = 'USER_FETCH_ACTION_REQUEST_ID'

export const usersFetchAction: IActionFactoryReturn = fetchActionFactory(
    USERS_FETCH_API,
    USERS_FETCH_ACTION_TYPE
)
export const isUserFetchActionInPending = isActionInPending(
    usersFetchAction.pendingActionTypeWithSpinner,
    USER_FETCH_ACTION_REQUEST_ID
)

export const USER_UPDATE_ACTION = 'USER_UPDATE_ACTION'
export const USER_UPDATE_ACTION_REQUEST_ID = 'USER_UPDATE_ACTION_REQUEST_ID'

export const userUpdateAction: IActionFactoryReturn = fetchActionFactory(
    USER_UPDATE_API,
    USER_UPDATE_ACTION
)
export const isUserUpdateActionInPending = isActionInPending(
    userUpdateAction.pendingActionTypeWithSpinner,
    USER_UPDATE_ACTION_REQUEST_ID
)

export const userUpdateStatusSuccess: Epic = triggerSnackbarEpicCreator(
    userUpdateAction.successActionType,
    USERS_UPDATE_ACTION,
    true
)

export const USER_GET_ACTION = 'USER_GET_ACTION'
export const USER_GET_ACTION_REQUEST_ID = 'USER_GET_ACTION_REQUEST_ID'

export const userGetAction: IActionFactoryReturn = fetchActionFactory(
    USER_GET_API,
    USER_GET_ACTION
)
export const isUserGetActionInPending = isActionInPending(
    userGetAction.pendingActionTypeWithSpinner,
    USER_GET_ACTION_REQUEST_ID
)

export const CLEAR_CACHED_USER = 'CLEAR_CACHED_USER'

export const clearCashedUser = () => ({
    type: CLEAR_CACHED_USER,
})

export const USER_PROJECTS_FETCH_ACTION_TYPE =
  'USER_PROJECTS_FETCH_ACTION_TYPE'
export const USER_PROJECTS_FETCH_ACTION_REQUEST_ID =
  'USER_PROJECTS_FETCH_ACTION_REQUEST_ID'

export const userProjectsFetchAction: IActionFactoryReturn = fetchActionFactory(
    USER_PROJECTS_FETCH_API,
    USER_PROJECTS_FETCH_ACTION_TYPE
)
export const isUserProjectsFetchActionInPending = isActionInPending(
    userProjectsFetchAction.pendingActionTypeWithSpinner,
    USER_PROJECTS_FETCH_ACTION_REQUEST_ID
)

export const USER_PROJECT_CREATE_ACTION = 'USER_PROJECT_CREATE_ACTION'
export const USER_PROJECT_CREATE_ACTION_REQUEST_ID =
  'USER_PROJECT_CREATE_ACTION_REQUEST_ID'

export const userProjectCreateAction: IActionFactoryReturn = fetchActionFactory(
    USER_PROJECT_CREATE_API,
    USER_PROJECT_CREATE_ACTION
)
export const isUserProjectCreateActionInPending = isActionInPending(
    userProjectCreateAction.pendingActionTypeWithSpinner,
    USER_PROJECT_CREATE_ACTION_REQUEST_ID
)

export const userProjectCreateStatusSuccess: Epic = triggerSnackbarEpicCreator(
    userProjectCreateAction.successActionType,
    USER_PROJECT_CREATION_SUCCESS,
    true
)

export const USER_PROJECT_DELETE_ACTION = 'USER_PROJECT_DELETE_ACTION'
export const USER_PROJECT_DELETE_ACTION_REQUEST_ID =
  'USER_PROJECT_DELETE_ACTION_REQUEST_ID'

export const userProjectDeleteAction: IActionFactoryReturn = fetchActionFactory(
    USER_PROJECT_DELETE_API,
    USER_PROJECT_DELETE_ACTION
)
export const isProjectDeleteActionInPending = isActionInPending(
    userProjectDeleteAction.pendingActionTypeWithSpinner,
    USER_PROJECT_DELETE_ACTION_REQUEST_ID
)

export const userProjectDeleteStatusSuccess: Epic = triggerSnackbarEpicCreator(
    userProjectDeleteAction.successActionType,
    USER_PROJECT_DELETING_SUCCESS,
    true
)

export const USER_PROJECT_UPDATE_ACTION = 'USER_PROJECT_UPDATE_ACTION'
export const USER_PROJECT_UPDATE_ACTION_REQUEST_ID =
  'USER_PROJECT_UPDATE_ACTION_REQUEST_ID'

export const userProjectUpdateAction: IActionFactoryReturn = fetchActionFactory(
    USER_PROJECT_UPDATE_API,
    USER_PROJECT_UPDATE_ACTION
)
export const isProjectUpdateActionInPending = isActionInPending(
    userProjectUpdateAction.pendingActionTypeWithSpinner,
    USER_PROJECT_UPDATE_ACTION_REQUEST_ID
)

export const userProjectUpdateStatusSuccess: Epic = triggerSnackbarEpicCreator(
    userProjectDeleteAction.successActionType,
    USER_PROJECT_UPDATING_SUCCESS,
    true
)

export const CLEAR_USER_PROJECTS = 'CLEAR_USER_PROJECTS'

export const clearUserProjects = () => {
    return {
        type: CLEAR_USER_PROJECTS
    }
}

const usersActions = combineEpics(
    userUpdateStatusSuccess,
    userProjectCreateStatusSuccess,
    userProjectDeleteStatusSuccess,
    epicCreator(userUpdateAction.successActionType, (action) => {
        store.dispatch(getUser(action?.meta?.meta?.pathVariable?.id))
    }),
    epicCreator(userProjectDeleteAction.successActionType, (action) => {
        console.log(action)
        store.dispatch(closeCurrentDialog())
        store.dispatch(fetchUserProjects(action?.meta?.meta?.id))
    }),
    epicCreator(userProjectCreateAction.successActionType, (action) => {
        store.dispatch(closeCurrentDialog())
        store.dispatch(fetchUserProjects(action?.meta?.meta?.pathVariable?.id))
    }),
    switchMapFetchEpics(usersFetchAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(userGetAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(userUpdateAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(userProjectsFetchAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(userProjectCreateAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(userProjectDeleteAction.pendingActionTypeWithSpinner)
)

export default usersActions
