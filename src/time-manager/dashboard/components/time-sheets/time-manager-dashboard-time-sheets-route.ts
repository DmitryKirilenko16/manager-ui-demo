import { TIME_MANAGER_PATH } from 'main.container.routes'
import { TIME_SHEETS_PATH } from 'time-manager/dashboard/time-manager-dashboard-routes'
import { IRoute } from 'react-core/routing/router.types'

export const TIME_MANAGER_DASHBOARD_TIME_SHEETS_ROUTES: IRoute = Object.freeze({
    path: `${TIME_MANAGER_PATH}${TIME_SHEETS_PATH}`,
    description: 'Time sheets page',
    subrouting: {
        list: {
            path: `${TIME_MANAGER_PATH}${TIME_SHEETS_PATH}`,
            description: 'Time sheets list',
        },
    },
})

export const TIME_MANAGER_DASHBOARD_TIME_SHEETS_SUB_ROUTES =
  TIME_MANAGER_DASHBOARD_TIME_SHEETS_ROUTES.subrouting
