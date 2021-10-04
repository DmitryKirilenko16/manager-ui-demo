import {combineEpics, Epic} from 'redux-observable'
import spinnerActions from './spinner/redux/spinner.epics'

export const rootEpics: Epic = combineEpics(
    spinnerActions,
)
