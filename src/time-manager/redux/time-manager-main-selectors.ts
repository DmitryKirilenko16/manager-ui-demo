import { ITimeManagerReducer } from './time-manager.reducers'
import { ITimeManagerRootState } from '../../redux/app.reducers'

export const timeManagerRootSelector = (
    state: ITimeManagerRootState
): ITimeManagerReducer => state?.timeManager
