import {IUser, IUserProject} from '../users.types'

export const USERS_INITIAL_STATE = {
    list: null as null | any,
    user: null as null | IUser,
    totalUsersCount: null as null | number,
    userProjects: null as null | IUserProject[]
}

export const USERS_PAGINATION = {
    pageSize: 10,
}
