import {Store} from 'redux'
import {appReducer} from './app.reducers'
import {configureStore} from 'react-core/core.store'
import {timeManagerRootEpics} from './app.epics'


/**
 * STORE DELL'APP CONFIGURATO
 */
export const store: Store = configureStore(appReducer, timeManagerRootEpics)
