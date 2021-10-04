import { combineEpics, Epic } from 'redux-observable'
import usersActions from 'time-manager/dashboard/components/users/redux/users.actions'
import rootActions from './root.actions'
import failureActions from 'react-core/error-handling/error.epics'
import timeSheetsActions from 'time-manager/dashboard/components/time-sheets/redux/time-sheets.actions'

export const timeManagerRootEpics: Epic = combineEpics(
    usersActions,
    timeSheetsActions,
    rootActions,
    failureActions
)
