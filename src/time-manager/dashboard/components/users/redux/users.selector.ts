import { createSelector } from 'reselect'
import { timeManagerRootSelector } from 'time-manager/redux/time-manager-main-selectors'
import {IUser} from '../users.types'
import { ITimeManagerReducer } from 'time-manager/redux/time-manager.reducers'

//todo create usersSelector store?.users

export const usersSelector = createSelector(
    timeManagerRootSelector,
    (users) => users?.users?.list && users?.users?.list
)

export const totalUsersSelector = createSelector(
    timeManagerRootSelector,
    (users) => users?.users?.list && users?.users?.totalUsersCount
)

export const cachedUserSelector = createSelector(
    timeManagerRootSelector,
    (users: ITimeManagerReducer): IUser | null => users?.users?.user || null
)

export const userProjectsSelector = createSelector(
    timeManagerRootSelector,
    (store) => store?.users?.userProjects
)
