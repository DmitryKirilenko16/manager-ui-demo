import { combineEpics, Epic } from 'redux-observable'
import { IActionFactoryReturn } from 'react-core/fetch/fetch.types'
import { fetchActionFactory } from 'react-core/fetch/fetch.action.factory'
import { isActionInPending } from 'react-core/spinner/redux/spinner.reducers'
import { switchMapFetchEpics } from 'react-core/fetch/fetch.call'
import {
    TIME_SHEET_CREATE_API,
    TIME_SHEET_DELETE_API,
    TIME_SHEET_UPDATE_API,
    TIME_SHEETS_FETCH_API,
} from '../time-sheets.api.constants'
import { ITimeSheet } from '../time-sheets.types'
import {
    epicCreator,
    triggerSnackbarEpicCreator,
} from 'react-core/fetch/fetch.epic.creators'
import {
    TIME_SHEET_CREATION_SUCCESS,
    TIME_SHEET_DELETING_SUCCESS,
    TIME_SHEET_UPDATING_SUCCESS,
} from '../time-sheets.constants'
import { store } from 'redux/app.store'
import { closeCurrentDialog } from 'shared/dialogs/redux/dialogs.actions'
import { fetchTimeSheetsList } from '../time-sheets.utils'

export const TIME_SHEETS_FETCH_ACTION_TYPE = 'TIME_SHEETS_FETCH_ACTION_TYPE'
export const TIME_SHEET_FETCH_ACTION_REQUEST_ID =
  'TIME_SHEET_FETCH_ACTION_REQUEST_ID'

export const timeSheetsFetchAction: IActionFactoryReturn = fetchActionFactory(
    TIME_SHEETS_FETCH_API,
    TIME_SHEETS_FETCH_ACTION_TYPE
)
export const isTimeSheetFetchActionInPending = isActionInPending(
    timeSheetsFetchAction.pendingActionTypeWithSpinner,
    TIME_SHEET_FETCH_ACTION_REQUEST_ID
)

export const TIME_SHEET_CREATE_ACTION = 'TIME_SHEET_CREATE_ACTION'
export const TIME_SHEET_CREATE_ACTION_REQUEST_ID =
  'TIME_SHEET_CREATE_ACTION_REQUEST_ID'

export const timeSheetCreateAction: IActionFactoryReturn = fetchActionFactory(
    TIME_SHEET_CREATE_API,
    TIME_SHEET_CREATE_ACTION
)
export const isTimeSheetCreateActionInPending = isActionInPending(
    timeSheetCreateAction.pendingActionTypeWithSpinner,
    TIME_SHEET_CREATE_ACTION_REQUEST_ID
)

export const timeSheetsCreateStatusSuccess: Epic = triggerSnackbarEpicCreator(
    timeSheetCreateAction.successActionType,
    TIME_SHEET_CREATION_SUCCESS,
    true
)

export const TIME_SHEET_DELETE_ACTION = 'TIME_SHEET_DELETE_ACTION'
export const TIME_SHEET_DELETE_ACTION_REQUEST_ID =
  'TIME_SHEET_DELETE_ACTION_REQUEST_ID'

export const timeSheetDeleteAction: IActionFactoryReturn = fetchActionFactory(
    TIME_SHEET_DELETE_API,
    TIME_SHEET_DELETE_ACTION
)
export const isTimeSheetDeleteActionInPending = isActionInPending(
    timeSheetDeleteAction.pendingActionTypeWithSpinner,
    TIME_SHEET_DELETE_ACTION_REQUEST_ID
)

export const timeSheetsDeleteStatusSuccess: Epic = triggerSnackbarEpicCreator(
    timeSheetDeleteAction.successActionType,
    TIME_SHEET_DELETING_SUCCESS,
    true
)

export const TIME_SHEET_UPDATE_ACTION = 'TIME_SHEET_UPDATE_ACTION'
export const TIME_SHEET_UPDATE_ACTION_REQUEST_ID =
  'TIME_SHEET_UPDATE_ACTION_REQUEST_ID'

export const timeSheetUpdateAction: IActionFactoryReturn = fetchActionFactory(
    TIME_SHEET_UPDATE_API,
    TIME_SHEET_UPDATE_ACTION
)
export const isTimeSheetUpdateActionInPending = isActionInPending(
    timeSheetUpdateAction.pendingActionTypeWithSpinner,
    TIME_SHEET_UPDATE_ACTION_REQUEST_ID
)

export const timeSheetsUpdateStatusSuccess: Epic = triggerSnackbarEpicCreator(
    timeSheetUpdateAction.successActionType,
    TIME_SHEET_UPDATING_SUCCESS,
    true
)

export const TIME_SHEET_GET_ACTION = 'TIME_SHEET_GET_ACTION'

export const setCurrentTimeSheet = (timeSheet: ITimeSheet) => ({
    type: TIME_SHEET_GET_ACTION,
    payload: timeSheet,
})

export const CLEAR_CURRENT_TIME_SHEET = 'CLEAR_CURRENT_TIME_SHEET'
export const clearCurrentTimeSheet = () => {
    return {
        type: CLEAR_CURRENT_TIME_SHEET
    }
}

const timeSheetsActions = combineEpics(
    epicCreator(timeSheetDeleteAction.successActionType, (action) => {
        store.dispatch(closeCurrentDialog())
        store.dispatch(fetchTimeSheetsList(action?.meta?.payload?.profileId))
        store.dispatch(clearCurrentTimeSheet())
    }),
    epicCreator(timeSheetCreateAction.successActionType, (action) => {
        store.dispatch(closeCurrentDialog())
        store.dispatch(fetchTimeSheetsList(action?.meta?.meta?.id))
    }),
    epicCreator(timeSheetUpdateAction.successActionType, (action) => {
        store.dispatch(closeCurrentDialog())
        store.dispatch(fetchTimeSheetsList(action?.meta?.meta?.id))
        store.dispatch(clearCurrentTimeSheet())
    }),
    timeSheetsDeleteStatusSuccess,
    timeSheetsCreateStatusSuccess,
    timeSheetsUpdateStatusSuccess,
    switchMapFetchEpics(timeSheetsFetchAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(timeSheetUpdateAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(timeSheetDeleteAction.pendingActionTypeWithSpinner),
    switchMapFetchEpics(timeSheetCreateAction.pendingActionTypeWithSpinner)
)

export default timeSheetsActions
