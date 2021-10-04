import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { TIME_MANAGER_DASHBOARD_USERS_SUB_ROUTES } from './time-manager-dashboard-users-route'
import { UsersList } from './components/list/UsersList'
import { UserCreate } from './components/create/UserCreate'
import {UsersDetailsContainer} from './UsersDetailsContainer'

export const UsersRoute: React.FC = () => {
    return (
        <Switch>
            <Route
                exact
                path={`${TIME_MANAGER_DASHBOARD_USERS_SUB_ROUTES?.list.path}`}
                component={UsersList}
            />

            <Route
                exact
                path={`${TIME_MANAGER_DASHBOARD_USERS_SUB_ROUTES?.create.path}`}
                component={UserCreate}
            />

            <Route
                path={`${TIME_MANAGER_DASHBOARD_USERS_SUB_ROUTES?.details?.path}`}
                component={UsersDetailsContainer}
            />
        </Switch>
    )
}
