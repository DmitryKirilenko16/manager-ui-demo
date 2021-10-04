import React from 'react'
import { Route, Switch } from 'react-router'
import { TimeManagerAuthRoutes } from './auth/TimeManagerAuthRoutes'
import {
    AUTH_PATH,
    TIME_MANAGER_PATH,
} from '../main.container.routes'
import {DashboardRoutes} from './dashboard/DashboardRoute'

export const TimeManagerRoute: React.FC = () => {
    return (
        <>
            <Switch>
                {/*TIME MANAGER LOGIN*/}
                <Route
                    path={`${TIME_MANAGER_PATH}${AUTH_PATH}`}
                    component={TimeManagerAuthRoutes}
                />

                <Route
                    path={'/'}
                    component={DashboardRoutes}
                />
            </Switch>
        </>
    )
}
