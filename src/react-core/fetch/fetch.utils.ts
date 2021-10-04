import {
    IActionFactoryReturn,
    IFetchAction,
    IPathVariable,
    IQueryParameter,
    IRequestHeaders,
    IRequestModel,
} from './fetch.types'
import {isActionInPending} from '../spinner/redux/spinner.reducers'
import {fetchActionFactory} from './fetch.action.factory'
import {switchMapFetchEpics} from './fetch.call'
import {Observable} from 'rxjs'
import {IRootState} from '../core.types'

// Rename with better name
export const fetchActionGenerator = (
    name: string,
    requestModel: IRequestModel,
    epicMap: (typeWithSpin: string) => (action$: Observable<IFetchAction>) => Observable<any> = switchMapFetchEpics,
    serverBaseUrl?: string,
): [
    IActionFactoryReturn,
    (payload: any,
     runTimeHeaders?: IRequestHeaders,
     pathVariable?: IPathVariable,
     queryParameter?: IQueryParameter,
     meta?: object) => IFetchAction,
    (action$: Observable<IFetchAction>) => Observable<any>,
    (state: IRootState) => boolean,
    string,
    string
] => {
    const ACTION_TYPE = `${name}_ACTION_TYPE`
    const ACTION_REQUEST_ID = `${name}_ACTION_REQUEST_ID`
    const action: IActionFactoryReturn = fetchActionFactory(requestModel, ACTION_TYPE, serverBaseUrl)
    const actionPendingSelector = isActionInPending(action.pendingActionTypeWithSpinner, ACTION_REQUEST_ID)
    const builder = (
        payload: any,
        runTimeHeaders?: IRequestHeaders,
        pathVariable?: IPathVariable,
        queryParameter?: IQueryParameter,
        meta?: object,
    ) => action.build(payload, ACTION_REQUEST_ID, runTimeHeaders, pathVariable, queryParameter, meta)
    const epic = epicMap(action.pendingActionTypeWithSpinner)
    return [action, builder, epic, actionPendingSelector, ACTION_TYPE, ACTION_REQUEST_ID]
}

export const arrayBuffer2JSON = (buffer: ArrayBuffer) => JSON.parse(String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))))
