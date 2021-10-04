import { IAction } from 'react-core/core.types'

const TIME_MANAGER_LOGGING_IN_INITIAL_STATE = {
    isLoggedIn: false,
}

export type TimeManagerLoggingInState =
  typeof TIME_MANAGER_LOGGING_IN_INITIAL_STATE

export const timeManagerLoggingReducer = (
    state: TimeManagerLoggingInState = TIME_MANAGER_LOGGING_IN_INITIAL_STATE,
    action: IAction
): TimeManagerLoggingInState => {
    switch (action.type) {
    default:
        return state
    }
}

export const timeManagerBearerTokenReducer = (
    state: string | null = null,
    action: IAction
): string | null => {
    switch (action.type) {
    default:
        return state
    }
}
