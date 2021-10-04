import { ISideMenuItem } from './side.menu.types'
import {
    DASHBOARD_PATH,
    TIME_MANAGER_PATH,
} from '../../../main.container.routes'
import {
    CUSTOMERS_PATH,
    PROFILE_PATH,
    PROJECTS_PATH,
    TIME_SHEETS_PATH,
    USERS_PATH,
} from '../time-manager-dashboard-routes'

export const SIDE_MENU_ITEM: ISideMenuItem[] = [
    {
        label: 'Dashboard',
        path: `${TIME_MANAGER_PATH}${DASHBOARD_PATH}`,
    },
    {
        label: 'Customers',
        path: `${TIME_MANAGER_PATH}${CUSTOMERS_PATH}`,
    },
    {
        label: 'Users',
        path: `${TIME_MANAGER_PATH}${USERS_PATH}`,
        className: 'campaign_tour_section',
    },
    {
        label: 'Projects',
        path: `${TIME_MANAGER_PATH}${PROJECTS_PATH}`,
    },
    {
        label: 'Time Sheets',
        path: `${TIME_MANAGER_PATH}${TIME_SHEETS_PATH}`,
    },
    {
        label: 'Profile',
        path: `${TIME_MANAGER_PATH}${PROFILE_PATH}`,
    },
]
