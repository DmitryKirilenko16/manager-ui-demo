import { IAction } from 'react-core/core.types'
import { TIME_SHEETS_INITIAL_STATE } from '../time-sheets.constants'
import { TimeSheetsState } from '../time-sheets.types'
import {
    CLEAR_CURRENT_TIME_SHEET,
    TIME_SHEET_GET_ACTION,
    timeSheetsFetchAction,
} from './time-sheets.actions'

export const timeSheetsReducer = (
    state: TimeSheetsState = TIME_SHEETS_INITIAL_STATE,
    action: IAction
): TimeSheetsState => {
    switch (action?.type) {
    case timeSheetsFetchAction && timeSheetsFetchAction?.successActionType: {
        return { ...state, list: action.payload }
    }

    case TIME_SHEET_GET_ACTION: {
        return { ...state, currentTimeSheet: action.payload }
    }

    case CLEAR_CURRENT_TIME_SHEET: {
        return { ...state, currentTimeSheet: null }
    }

    default:
        return state
    }
}
