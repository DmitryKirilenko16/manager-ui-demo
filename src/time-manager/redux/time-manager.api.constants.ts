import { HttpMethods, IRequestModel } from '../../react-core/fetch/fetch.types'

export const GOOGLE_ENDPOINT = '/google'

export const LOGIN_API: IRequestModel = {
    url: GOOGLE_ENDPOINT,
    method: HttpMethods.GET,
}
