import { combineReducers } from 'redux'
import {
    TimeManagerLoggingInState,
    timeManagerLoggingReducer,
} from '../auth/redux/auth.reducer'
import { usersReducer } from 'time-manager/dashboard/components/users/redux/users.reducer'
import { UsersState } from 'time-manager/dashboard/components/users/users.types'
import { CustomersState } from '../dashboard/components/customers/customers.types'
import { customersReducer } from '../dashboard/components/customers/redux/customers.reducer'
import { ProjectsState } from '../dashboard/components/projects/projects.types'
import { projectsReducer } from '../dashboard/components/projects/redux/projects.reducer'
import { TimeSheetsState } from '../dashboard/components/time-sheets/time-sheets.types'
import { timeSheetsReducer } from '../dashboard/components/time-sheets/redux/time-sheets.reducer'

export interface ITimeManagerReducer {
  loggedIn: TimeManagerLoggingInState;
  customers: CustomersState;
  users: UsersState;
  projects: ProjectsState;
  timeSheets: TimeSheetsState;
}

export const timeManagerReducers = combineReducers<ITimeManagerReducer>({
    loggedIn: timeManagerLoggingReducer,
    customers: customersReducer,
    users: usersReducer,
    projects: projectsReducer,
    timeSheets: timeSheetsReducer,
})
