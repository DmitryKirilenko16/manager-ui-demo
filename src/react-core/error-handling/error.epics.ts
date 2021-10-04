import { filter, switchMap } from 'rxjs/internal/operators'
import { FAILURE, IFailureFetchAction } from '../fetch/fetch.types'
import { NEVER } from 'rxjs/internal/observable/never'
import { Observable } from 'rxjs/internal/Observable'
import { TYPE_FETCH_CONST } from 'react-core/fetch/fetch.action.factory'
import { EStatusCodes, FORBIDDEN_ERROR_MESSAGE } from './error.constants'
import { combineEpics } from 'redux-observable'
import { showError } from 'react-core/components/toast/GenericSnackbar'
import { BrowserRouterHistory } from '../routing/route'
import { AUTH_PATH, TIME_MANAGER_PATH } from '../../main.container.routes'
import {
    ERROR_PATH,
    LOGIN_PATH,
} from 'time-manager/auth/time-manager-auth-routes'

export const internalServerErrorHandlingEpic = (
    action$: Observable<IFailureFetchAction>
) => {
    return action$.pipe(
        filter((action: IFailureFetchAction) => {
            return (
                action.type.includes(TYPE_FETCH_CONST) &&
        action.type.includes(FAILURE) &&
        Object.values(EStatusCodes).includes(action.payload?.status)
            )
        }),
        switchMap((failureAction: IFailureFetchAction) => {
            const errorMessageCode = failureAction?.payload?.response?.error || failureAction?.payload?.response?.message
            const errorForUser = `${errorMessageCode}`
            showError(errorForUser, errorMessageCode)
            if (
                failureAction.payload?.status === EStatusCodes.UNAUTHORIZED
            ) {
                BrowserRouterHistory.push(
                    `${TIME_MANAGER_PATH}${AUTH_PATH}${LOGIN_PATH}`
                )
            }
            return NEVER
        })
    )
}

export const forbiddenServerErrorHandlingEpic = (
    action$: Observable<IFailureFetchAction>
) => {
    return action$.pipe(
        filter((action: IFailureFetchAction) => {
            return (
                action.type.includes(TYPE_FETCH_CONST) &&
        action.type.includes(FAILURE) &&
        action.payload?.status === EStatusCodes.FORBIDDEN &&
        action.payload?.response?.error === FORBIDDEN_ERROR_MESSAGE
            )
        }),
        switchMap((failureAction: IFailureFetchAction) => {
            const errorMessageCode = failureAction?.payload?.response?.error
            const errorForUser = `error.${errorMessageCode}`
            showError(errorForUser, errorMessageCode)
            BrowserRouterHistory.push(
                `${TIME_MANAGER_PATH}${AUTH_PATH}${ERROR_PATH}`
            )
            return NEVER
        })
    )
}

const failureActions = combineEpics(
    internalServerErrorHandlingEpic,
    forbiddenServerErrorHandlingEpic
)

export default failureActions
