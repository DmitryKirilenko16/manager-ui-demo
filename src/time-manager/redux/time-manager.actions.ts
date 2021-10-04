import { IActionFactoryReturn } from '../../react-core/fetch/fetch.types'
import { fetchActionFactory } from '../../react-core/fetch/fetch.action.factory'
import { isActionInPending } from '../../react-core/spinner/redux/spinner.reducers'
import { LOGIN_API } from './time-manager.api.constants'
import {combineEpics} from 'redux-observable'

export const LOGIN_ACTION_TYPE = 'LOGIN_ACTION_TYPE'
export const LOGIN_ACTION_REQUEST_ID = 'LOGIN_ACTION_REQUEST_ID'

export const loginAction: IActionFactoryReturn = fetchActionFactory(
    LOGIN_API,
    LOGIN_ACTION_TYPE
)
export const isLoginActionInPending = isActionInPending(
    loginAction.pendingActionTypeWithSpinner,
    LOGIN_ACTION_REQUEST_ID
)


const authActons = combineEpics()
