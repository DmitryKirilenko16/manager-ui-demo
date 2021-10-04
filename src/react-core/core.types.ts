import { Action } from 'redux'
import {TFunction} from 'react-i18next'
import {ICurrentDialog} from '../shared/dialogs/dialogs.types'
import {ITimeManagerReducer} from '../time-manager/redux/time-manager.reducers'

export interface IRootState {
  spinners: string[];
  currentDialog: ICurrentDialog;
  timeManager: ITimeManagerReducer
}

export interface IAction extends Action {
  payload?: any;
  meta?: any;
  key?: any;
}

export interface IRouteId {
  id: string
}

export type I18nT = TFunction<'translation'>
