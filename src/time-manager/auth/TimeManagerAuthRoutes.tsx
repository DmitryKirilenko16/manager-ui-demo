import React from 'react'
import { Route, Switch } from 'react-router'
import { LoginFormContainer } from './login/LoginFormContainer'
import { AUTH_PATH, TIME_MANAGER_PATH } from '../../main.container.routes'
import { TIME_MANAGER_AUTH_SUB_ROUTES } from './time-manager-auth-routes'
import { ErrorPage } from './login/ErrorPage'

export const TimeManagerAuthRoutes: React.FC = () => {
    const authPath = (route: string) =>
        `${TIME_MANAGER_PATH}${AUTH_PATH}${TIME_MANAGER_AUTH_SUB_ROUTES?.[route]?.path}`
    return (
        <Switch>
            <Route path={authPath('error')} component={() => <ErrorPage />} />
            {/* LOGIN PAGE */}
            <Route
                path={authPath('login')}
                component={() => <LoginFormContainer />}
            />
        </Switch>
    )
}
