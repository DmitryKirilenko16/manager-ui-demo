import { combineReducers } from 'redux'
import { spinnerReducer } from 'react-core/spinner/redux/spinner.reducers'
import {ITimeManagerReducer, timeManagerReducers} from '../time-manager/redux/time-manager.reducers'
import {IRootState} from '../react-core/core.types'
import {currentDialogReducer} from '../shared/dialogs/redux/dialogs.reducers'

export interface ITimeManagerRootState extends IRootState {
  timeManager: ITimeManagerReducer,
}

export const appReducer = combineReducers({
    spinners: spinnerReducer,
    currentDialog: currentDialogReducer,
    timeManager: timeManagerReducers,
})
