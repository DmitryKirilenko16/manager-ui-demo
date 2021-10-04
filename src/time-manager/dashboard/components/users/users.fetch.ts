import {genericRequest} from 'react-core/fetch/fetch.call'
import {GET_POSTS} from './users.constants'

export const getPostsRequest = () => {
    return genericRequest(
        GET_POSTS.url,
        GET_POSTS.method,
        {},
        {},
        {},
        null,
    )
}
