import {
    applyMiddleware,
    CombinedState,
    compose,
    createStore,
    Reducer,
    PreloadedState, Store,
} from 'redux'
import {IAction, IRootState} from './core.types'
import {combineEpics, createEpicMiddleware, Epic} from 'redux-observable'
import {rootEpics} from './core.epic'


/**
 * REDUX DEVTOOLS EXTENSION CONFIGURATION
 */
const reduxDevToolExtensionComposeConfiguration = process.env.NODE_ENV === 'development' ? {} : Object.freeze({
    features: {
        pause: false, // start/pause recording of dispatched actions
        lock: false, // lock/unlock dispatching actions and side effects
        persist: false, // persist states on page reloading
        export: true, // export history of actions in a file
        import: false, // import history of actions from a file
        jump: false, // jump back and forth (time travelling)
        skip: false, // skip (cancel) actions
        reorder: false, // drag and drop actions in the history list
        dispatch: false, // dispatch custom actions or action creators
        test: true, // generate tests for the selected actions
    },
})

/**
 * REDUX DEVTOOLS
 */
export const composeEnhancers = typeof (window as any) === 'object' && typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxDevToolExtensionComposeConfiguration) : compose

export let CoreStore: null | Store = null

/**
 * redux STORE
 */
export const configureStore = <T = IRootState>(appReducer: Reducer<CombinedState<T>>, appEpics: Epic): Store => {
    const initialState = {} as PreloadedState<T>

    const rootReducer = (state: any, action: IAction) => {
        return appReducer(state, action)
    }

    /**
     * REDUX OBSERVABLE - EPICS MIDDLEWARE
     */
    const epicsMiddleware = createEpicMiddleware<any, any, T, any>()

    const epics = combineEpics(rootEpics, appEpics)

    const configuredStore = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(epicsMiddleware),
        ))

    epicsMiddleware.run(epics)
    CoreStore = configuredStore
    return configuredStore
}
