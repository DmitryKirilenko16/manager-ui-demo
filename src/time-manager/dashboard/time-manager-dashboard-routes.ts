import { IRoute } from '../../react-core/routing/router.types'
import { DASHBOARD_PATH } from '../../main.container.routes'

export const CUSTOMERS_PATH = '/customers'
export const USERS_PATH = '/users'
export const PROJECTS_PATH = '/projects'
export const TIME_SHEETS_PATH = '/time-sheets'
export const PROFILE_PATH = '/profile'
export const CREATE_PATH = '/create'

export const TIME_MANAGER_DASHBOARD_ROUTES: IRoute = Object.freeze({
    path: DASHBOARD_PATH,
    description: 'Time manager Dashboard',
    subrouting: {
        dashboard: {
            path: DASHBOARD_PATH,
            description: 'Time manager Dashboard',
        },
        customers: {
            path: CUSTOMERS_PATH,
            description: 'Time manager Customers',
        },
        users: {
            path: USERS_PATH,
            description: 'Time manager users',
        },
        projects: {
            path: PROJECTS_PATH,
            description: 'Time manager projects',
        },
        timeSheets: {
            path: TIME_SHEETS_PATH,
            description: 'Time manager time sheets'
        },
        profile: {
            path: PROFILE_PATH,
            description: 'Time manager profile'
        }
    },
})

export const TIME_MANAGER_DASHBOARD_SUB_ROUTES =
  TIME_MANAGER_DASHBOARD_ROUTES.subrouting
