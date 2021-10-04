import { useHistory, useLocation } from 'react-router'
import React, { useEffect } from 'react'
import * as queryString from 'querystring'
import {
    DASHBOARD_PATH,
    TIME_MANAGER_PATH,
} from '../../../main.container.routes'
import {TOKEN_KEY} from '../auth.constants'

export const InsertToken: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const parsedParams = queryString.parse(location.search)
    const token = parsedParams['?token']

    useEffect(() => {
        if (token && typeof token === 'string') {
            history.push(`${TIME_MANAGER_PATH}${DASHBOARD_PATH}`)
            localStorage.setItem(TOKEN_KEY, token)
        }
    }, [history, token])

    return <div>Loading...</div>
}
