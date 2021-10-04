import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { TimeSheetsList } from './components/list/TimeSheetsList'
import { TIME_MANAGER_DASHBOARD_TIME_SHEETS_SUB_ROUTES } from './time-manager-dashboard-time-sheets-route'

export const TimeSheetsRoute: React.FC = () => {
    return (
        <Switch>
            <Route
                exact
                path={`${TIME_MANAGER_DASHBOARD_TIME_SHEETS_SUB_ROUTES?.list.path}`}
                component={TimeSheetsList}
            />
        </Switch>
    )
}
