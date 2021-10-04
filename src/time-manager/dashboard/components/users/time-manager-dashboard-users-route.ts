import { IRoute } from 'react-core/routing/router.types'
import { TIME_MANAGER_PATH } from 'main.container.routes'
import {USERS_PATH} from '../../time-manager-dashboard-routes'

export const USERS_DETAILS_PATH = '/:id'
export const USER_CREATE_PATH = '/create'

export const TIME_MANAGER_DASHBOARD_USERS_ROUTES: IRoute = Object.freeze({
    path: `${TIME_MANAGER_PATH}${USERS_PATH}`,
    description: 'Users page',
    subrouting: {
        list: {
            path: `${TIME_MANAGER_PATH}${USERS_PATH}`,
            description: 'Users list',
        },
        create: {
            path: `${TIME_MANAGER_PATH}${USERS_PATH}${USER_CREATE_PATH}`,
            description: 'Users creation',
        },
        details: {
            path: `${TIME_MANAGER_PATH}${USERS_PATH}${USERS_DETAILS_PATH}`,
            description: 'Users Details',
        },
    },
})

export const TIME_MANAGER_DASHBOARD_USERS_SUB_ROUTES = TIME_MANAGER_DASHBOARD_USERS_ROUTES.subrouting
