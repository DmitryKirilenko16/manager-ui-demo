import {ofType} from 'redux-observable'
import {Observable} from 'rxjs'
import {ajax, AjaxError, AjaxResponse} from 'rxjs/ajax'
import {API_URL, SERVER_BASE_URL} from './fetch.api'
import {spinnerAdd, spinnerRemove} from '../spinner/redux/spinner.action'
import {
    catchError,
    delay,
    exhaustMap,
    mergeMap,
    switchMap,
} from 'rxjs/operators'
import {
    HttpMethods,
    IFetchAction,
    IGenericRequestResponse,
    IPathVariable,
    IQueryParameter,
    IRequestHeaders,
    IRequestModel,
    WITH_NO_SPINNER,
    WITH_SPINNER,
} from './fetch.types'
import {BEARER, X_AUTH_TOKEN_KEY} from '../core.constants'
import {IAction} from '../core.types'
import {TOKEN_KEY} from '../../time-manager/auth/auth.constants'

export const fetchEpicsWithSpin = (action: IFetchAction) => {
    const newActionType: string = `${action.type.replace(
        WITH_NO_SPINNER,
        WITH_SPINNER,
    )}`
    return [
        {
            ...action,
            type: newActionType,
        },
        spinnerAdd(`${newActionType}_${action.meta.requestId}`),
    ]
}

interface IFetchEpicCreatorParams {
    successActions?: IAction[];
    failureActions?: IAction[];
    onResponse?: (data: any, state$?: Observable<any>) => IAction[];
}

const getMapFetchEpics =
    (
        map: (cb: (action: IFetchAction) => any) => any,
        typeWithSpin: string,
        fetchEpicCreatorParams?: IFetchEpicCreatorParams,
    ) =>
        (action$: Observable<IFetchAction>, state$?: Observable<any>) =>
            action$.pipe(
                ofType(typeWithSpin),
                map((caughtAction) =>
                    fetchHandlerEpics(caughtAction, state$, fetchEpicCreatorParams),
                ),
            )

// SWITCH MAP
// If the same request is going cancels another one
// LAST REQUEST MATTER
export const switchMapFetchEpics = (
    typeWithSpin: string,
    fetchEpicCreatorParams?: IFetchEpicCreatorParams,
) => getMapFetchEpics(switchMap, typeWithSpin, fetchEpicCreatorParams)
// EXHAUST MAP
// Ignores request if the same is going
// FIRST REQUEST MATTER
export const exhaustMapFetchEpics = (
    typeWithSpin: string,
    fetchEpicCreatorParams?: IFetchEpicCreatorParams,
) => getMapFetchEpics(exhaustMap, typeWithSpin, fetchEpicCreatorParams)

// MERGE MAP
// BOTH REQUESTS MATTER
export const mergeMapFetchEpics = (
    typeWithSpin: string,
    fetchEpicCreatorParams?: IFetchEpicCreatorParams,
) => getMapFetchEpics(mergeMap, typeWithSpin, fetchEpicCreatorParams)
/**
 * @category function build the http request via rxAjaxFromFetchAction and dispatch actions: spinner and success/failure
 * @param catchAction
 * @param state$
 * @param fetchEpicCreatorParams
 */
const fetchHandlerEpics = (
    catchAction: IFetchAction,
    state$?: Observable<any>,
    fetchEpicCreatorParams?: IFetchEpicCreatorParams,
): Observable<any> =>
    rxAjaxFromFetchAction(catchAction).pipe(
        delay(catchAction?.meta?.requestModel?.delay || 0),
        mergeMap((ajaxResponse: AjaxResponse) => {
            const isLoginPath: boolean =
                ajaxResponse.request.url === `${SERVER_BASE_URL}/`
            let nestedActions = [] as IAction[]

            catchAction.meta.responseHeaders = isLoginPath
                ? {
                    xAuthToken: ajaxResponse.xhr.getResponseHeader(
                        X_AUTH_TOKEN_KEY,
                    ) as string,
                }
                : {}
            catchAction.meta.responseStatusCode = ajaxResponse.status

            if (fetchEpicCreatorParams?.onResponse) {
                nestedActions = fetchEpicCreatorParams?.onResponse(
                    ajaxResponse.response,
                    state$,
                )
            }

            return [
                spinnerRemove(`${catchAction.type}_${catchAction.meta.requestId}`),
                catchAction.meta.successAction(ajaxResponse.response, catchAction),
                ...(fetchEpicCreatorParams?.successActions || []),
                ...nestedActions,
            ]
        }),
        catchError((error: AjaxError) => {
            return [
                catchAction?.meta?.failureAction(error, catchAction),
                spinnerRemove(`${catchAction.type}_${catchAction.meta.requestId}`),
                ...(fetchEpicCreatorParams?.failureActions || []),
            ]
        }),
    )
/**
 * @category build a rxjs ajax call via IFetchAction
 * @param action
 */
export const rxAjaxFromFetchAction = (
    action: IFetchAction,
): Observable<any> => {
    const urlWithQueryParameter: string =
        action?.meta?.queryParameter || action?.meta?.pathVariable
            ? urlBuilder(
                action?.meta?.requestModel?.url,
                action?.meta?.queryParameter,
                action?.meta?.pathVariable,
            )
            : action?.meta?.requestModel?.url

    const BASE_URL = action.meta.serverBaseUrl || API_URL

    const url: string = `${BASE_URL}${urlWithQueryParameter}`
    const token = localStorage.getItem(TOKEN_KEY)

    const headers = {
        Authorization: `${BEARER} ${token}`,
        ...action?.meta?.runTimeHeaders,
        ...action?.meta?.requestModel?.headers,
    }
    const responseType = action.meta.requestModel.responseType
    return ajax({
        url,
        headers,
        method: action?.meta?.requestModel?.method,
        ...(responseType ? {responseType} : {}),
        body: action?.payload,
    })
}

/**
 * @description Compone materialmente l'url e fa la chiamata
 * @param baseURL
 * @param queryParameter
 * @param pathVariable
 */
export const urlBuilder = (
    baseURL: string,
    queryParameter?: IQueryParameter,
    pathVariable?: IPathVariable | any,
): string => {
    const urlWithPathVariable = pathVariable
        ? Object.keys(pathVariable)
            // @ts-ignore
            .reduce(
                (url: string, key: string) =>
                    url.replace(`{${key}}`, pathVariable[key]),
                baseURL,
            )
        : baseURL

    const queryParamsString = queryParameter
        ? Object.keys(queryParameter).reduce(
            (agg: string, key: string) => `${agg}${key}=${queryParameter[key]}&`,
            '?',
        )
        : ''

    return `${urlWithPathVariable}${queryParamsString}`
}

/**
 * @description Create fetch request
 * @param endpoint
 * @param method
 * @param headers
 * @param queryParameter
 * @param pathVariable
 * @param body
 * @param baseUrl
 */
export const genericRequest = async <T = any>(
    endpoint: string,
    method: HttpMethods,
    headers?: IRequestHeaders,
    queryParameter?: IQueryParameter,
    pathVariable?: IPathVariable | string,
    body?: BodyInit | string | null,
    baseUrl?: string,
): Promise<IGenericRequestResponse<T>> => {
    try {
        const BASE_URL = baseUrl || (API_URL as string)

        const requestHeaders = {
            ...headers,
        }

        if (
            !requestHeaders['Content-Type' as keyof typeof requestHeaders] &&
            typeof body === 'string'
        ) {
            requestHeaders['Content-Type' as keyof typeof requestHeaders] =
                'application/json'
        }
        const response = await fetch(
            urlBuilder(`${BASE_URL}${endpoint}`, queryParameter, pathVariable),
            {
                method,
                body,
                headers: requestHeaders,
            },
        )
        let responseBody
        try {
            responseBody = await response.json()
        } catch (error) {
            responseBody = response.body
        }
        return {
            body: responseBody,
            status: response.status,
            response,
        }
    } catch (error) {
        throw error
    }
}

export const genericAPIRequest = (
    requestModel: IRequestModel,
    headers?: IRequestHeaders,
    queryParameter?: IQueryParameter,
    pathVariable?: IPathVariable | string,
    body?: BodyInit | string,
    baseUrl?: string,
) => {
    const _headers = {...requestModel.headers, ...headers}
    return genericRequest(
        requestModel.url,
        requestModel.method,
        _headers,
        queryParameter,
        pathVariable,
        body,
        baseUrl,
    )
}
