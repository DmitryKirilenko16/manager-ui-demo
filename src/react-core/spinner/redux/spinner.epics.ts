import {IFetchAction, WITH_NO_SPINNER} from '../../fetch/fetch.types'
import {combineEpics, Epic} from 'redux-observable'
import {filter, flatMap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {TYPE_FETCH_CONST} from '../../fetch/fetch.action.factory'
import {fetchEpicsWithSpin} from '../../fetch/fetch.call'


/**
 * @category general epics to intercept all fetch request, action are filtered by WITH_NO_SPINNER const and TYPE_FETCH_CONST
 * @param action$
 */
export const generalSpinnerEpics = (action$: Observable<IFetchAction>) =>
    action$.pipe(
        filter((action: IFetchAction) => action.type.includes(WITH_NO_SPINNER) && action.type.includes(TYPE_FETCH_CONST)),
        flatMap(fetchEpicsWithSpin),
    )

const spinnerActions: Epic = combineEpics(
    generalSpinnerEpics,
)

export default spinnerActions
