import { IAction, IRootState } from '../core.types'
import { Epic, ofType, StateObservable } from 'redux-observable'
import { NEVER, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import {switchMap} from 'rxjs/internal/operators'
import {showError, showSuccess} from '../components/toast/GenericSnackbar'
import {BrowserRouterHistory} from '../routing/route'

type EpicCreatorAction = IAction

export const triggerSnackbarEpicCreator = (
    actionType: string,
    message: string,
    isSuccess = true,
    redirectUrl?: string,
    func?: () => void
): Epic => {

    return (action$: Observable<IAction>) => {

        return action$.pipe(
            ofType(actionType),
            switchMap(() => {
                isSuccess ? showSuccess(message) : showError(message)
                redirectUrl && BrowserRouterHistory.push(redirectUrl)
                return NEVER
            }),
        )
    }
}

export const epicCreator = (
    actionType: string,
    callback: (action: EpicCreatorAction, state: IRootState) => any
): Epic => {
    return (
        action$: Observable<EpicCreatorAction>,
        state$: StateObservable<IRootState>
    ) => {
        return action$.pipe(
            ofType(actionType),
            mergeMap((action) => {
                callback(action, state$.value)
                return NEVER
            })
        )
    }
}
