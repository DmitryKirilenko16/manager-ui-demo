import {
    FAILURE,
    IActionFactoryReturn,
    IFailureFetchAction,
    IFetchAction,
    IPathVariable,
    IQueryParameter,
    IRequestModel,
    ISuccessFetchAction,
    SUCCESS,
    WITH_NO_SPINNER,
    WITH_SPINNER,
} from './fetch.types'
import {IAction} from '../core.types'

export const TYPE_FETCH_CONST = '@@fetch/'

export const fetchActionFactory = (requestModel: IRequestModel, type: string, serverBaseUrl?: string): IActionFactoryReturn => {
    const typeWithLibraryName = `${TYPE_FETCH_CONST}${type}`

    const successActionType: string = `${typeWithLibraryName}_${SUCCESS}`
    const failureActionType: string = `${typeWithLibraryName}_${FAILURE}`
    const pendingActionType: string = `${typeWithLibraryName}_${WITH_NO_SPINNER}`
    const pendingActionTypeWithSpinner: string = `${typeWithLibraryName}_${WITH_SPINNER}`

    return {
        build: (payload: any, requestId: string | number, runTimeHeaders: any, pathVariable?: IPathVariable, queryParameter?: IQueryParameter, meta?: object): IFetchAction => ({
            type: pendingActionType,
            payload,
            meta: {
                requestModel,
                queryParameter,
                pathVariable,
                runTimeHeaders,
                successAction: (succPayload: unknown, meta: IFetchAction): ISuccessFetchAction => ({
                    type: successActionType,
                    payload: succPayload,
                    meta,
                }),
                failureAction: (failPayload: unknown, meta: IFetchAction): IFailureFetchAction => ({
                    type: failureActionType,
                    payload: failPayload,
                    meta,
                }),
                requestId,
                serverBaseUrl,
                ...meta,
            },
        }
        ),
        failureActionType,
        pendingActionType,
        pendingActionTypeWithSpinner,
        successActionType,
    }
}

export const simpleActionGenerator = <IPayload = any>(type: string, payload?: IPayload): IAction => ({
    type,
    payload,
})
