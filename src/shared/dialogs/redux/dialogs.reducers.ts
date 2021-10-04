import {createSelector} from 'reselect'
import {CLOSE_CURRENT_DIALOG, SET_CURRENT_DIALOG} from './dialogs.actions'
import {IAction} from '../../../react-core/core.types'
import {ICurrentDialog} from '../dialogs.types'
import {ITimeManagerRootState} from '../../../redux/app.reducers'

export const currentDialogReducer = (state: ICurrentDialog | null = null, action: IAction): ICurrentDialog | null => {
    switch (action.type) {
    case SET_CURRENT_DIALOG:
        return {
            type: action?.payload?.type,
            size: action?.payload?.size,
            meta: action?.meta,
        }
    case CLOSE_CURRENT_DIALOG:
        return null
    default:
        return state
    }
}

export const currentDialogSelector = (state: ITimeManagerRootState): ICurrentDialog | null => state && state?.currentDialog

export const currentDialogTypeSelector = createSelector(
    currentDialogSelector,
    (currentDialog: ICurrentDialog | null): string | null => currentDialog && currentDialog.type,
)

export const currentDialogMetaSelector = createSelector(
    currentDialogSelector,
    (currentDialog: ICurrentDialog | null): any => currentDialog && currentDialog.meta,
)

export const currentDialogSizeSelector = createSelector(
    currentDialogSelector,
    (currentDialog: ICurrentDialog | null): string | null => currentDialog && currentDialog.size,
)
