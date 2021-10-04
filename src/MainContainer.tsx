import React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router'
import { BrowserRouterHistory } from './react-core/routing/route'
import { TimeManagerRoute } from './time-manager/TimeManagerRoute'
import {AUTH_PATH, TIME_MANAGER_PATH} from './main.container.routes'
import {
    LOGIN_PATH,
    SUCCESS_PATH,
    TIME_MANAGER_AUTH_SUB_ROUTES,
} from './time-manager/auth/time-manager-auth-routes'
import { InsertToken } from './time-manager/auth/insert-token/InsertToken'

export const MainContainer: React.FC = () => {
    return (
        <Router history={BrowserRouterHistory}>
            <Switch>
                {/*TIME MANAGER */}
                <Route path={TIME_MANAGER_PATH} component={TimeManagerRoute} />

                <Route path={`${LOGIN_PATH}${SUCCESS_PATH}`} component={InsertToken} />

                <Route path={'/'} exact>
                    <Redirect
                        to={`${TIME_MANAGER_PATH}${AUTH_PATH}${TIME_MANAGER_AUTH_SUB_ROUTES?.login?.path}`}
                    />
                </Route>
            </Switch>
        </Router>
    )
}
