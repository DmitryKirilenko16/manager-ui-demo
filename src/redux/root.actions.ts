import {epicCreator} from '../react-core/fetch/fetch.epic.creators'
import {TOKEN_KEY} from '../time-manager/auth/auth.constants'
import {BrowserRouterHistory} from '../react-core/routing/route'
import {AUTH_PATH, TIME_MANAGER_PATH} from '../main.container.routes'
import {LOGIN_PATH} from '../time-manager/auth/time-manager-auth-routes'
import {combineEpics} from 'redux-observable'

export const TIME_MANAGER_USER_LOGGED_OUT = 'TIME_MANAGER_USER_LOGGED_OUT'
export const timeManagerLoggedOutAction = () => ({
    type: TIME_MANAGER_USER_LOGGED_OUT,
})

const logoutEpic = epicCreator(TIME_MANAGER_USER_LOGGED_OUT, () => {
    localStorage.removeItem(TOKEN_KEY)
    BrowserRouterHistory.push(`${TIME_MANAGER_PATH}${AUTH_PATH}${LOGIN_PATH}`)
})

const rootActions = combineEpics(logoutEpic)

export default rootActions
