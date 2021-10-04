import {IAction, IRootState} from '../../core.types'
import { SPINNER_ADD, SPINNER_REMOVE } from './spinner.action'

export const spinnerReducer = (
    state: string[] = [],
    action: IAction
): string[] => {
    switch (action.type) {
    case SPINNER_ADD:
        return Array.from(new Set<string>([...state, action.payload]))
    case SPINNER_REMOVE:
        return state
            ? state.filter((value: string) => value !== action.payload)
            : state
    default:
        return state
    }
}

export const spinnersSelector = (state: IRootState): string[] => state.spinners

export const isActionInPending =
  (actionType: string, requestId: string = '') =>
      (state: IRootState): boolean => {
          const spinners = spinnersSelector(state)
          return (
              spinners &&
      !!spinners.find((spinnerName: string) =>
          !!requestId
              ? spinnerName === `${actionType}_${requestId}`
              : spinnerName === actionType
      )
          )
      }
