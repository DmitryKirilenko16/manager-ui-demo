import * as React from 'react'
import { Switch } from 'react-router-dom'
import { SideMenu } from './menu/SideMenu'
import { Redirect, Route, useLocation } from 'react-router'
import {
    DASHBOARD_PATH,
    TIME_MANAGER_PATH,
} from '../../main.container.routes'
import { HomePageContainer } from './components/homepage/HomePageContainer'
import { useDashboardRouteStyles } from './dashboard-route.styles'
import clsx from 'clsx'
import { UsersRoute } from './components/users/UsersRoute'
import {
    CREATE_PATH,
    TIME_MANAGER_DASHBOARD_SUB_ROUTES,
} from './time-manager-dashboard-routes'
import { CustomersRoute } from './components/customers/CustomersRoute'
import { ProjectsRoute } from './components/projects/ProjectsRoute'
import { TimeSheetsRoute } from './components/time-sheets/TimeSheetsRoute'
import { ProfileContainer } from '../../react-core/profile/ProfileContainer'
import { useMemo } from 'react'

export const DashboardRoutes: React.FC = () => {
    const classes = useDashboardRouteStyles()
    const location = useLocation()

    const areSideItemsHidden = useMemo(() => {
        return location.pathname.includes(CREATE_PATH)
    }, [location])

    return (
        <>
            <SideMenu isHidden={areSideItemsHidden} />

            <div
                className={clsx(classes.content, {
                    [classes.noPadding]: areSideItemsHidden,
                })}
            >
                <Switch>
                    {/* HOMEPAGE */}
                    <Route
                        exact
                        path={`${TIME_MANAGER_PATH}${DASHBOARD_PATH}`}
                        component={HomePageContainer}
                    />

                    <Route
                        path={`${TIME_MANAGER_PATH}${TIME_MANAGER_DASHBOARD_SUB_ROUTES?.users.path}`}
                        component={UsersRoute}
                    />

                    <Route
                        path={`${TIME_MANAGER_PATH}${TIME_MANAGER_DASHBOARD_SUB_ROUTES?.customers.path}`}
                        component={CustomersRoute}
                    />

                    <Route
                        path={`${TIME_MANAGER_PATH}${TIME_MANAGER_DASHBOARD_SUB_ROUTES?.projects.path}`}
                        component={ProjectsRoute}
                    />

                    <Route
                        path={`${TIME_MANAGER_PATH}${TIME_MANAGER_DASHBOARD_SUB_ROUTES?.timeSheets.path}`}
                        component={TimeSheetsRoute}
                    />

                    <Route
                        path={`${TIME_MANAGER_PATH}${TIME_MANAGER_DASHBOARD_SUB_ROUTES?.profile.path}`}
                        component={ProfileContainer}
                    />

                    <Route path={'/time-manager'}>
                        <Redirect to={`${TIME_MANAGER_PATH}${DASHBOARD_PATH}`} />
                    </Route>
                </Switch>
            </div>
        </>
    )
}
