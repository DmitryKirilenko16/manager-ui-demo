import {ICurrentDialogPayload} from '../dialogs.types'

export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'

export const setCurrentDialog = (currentDialog: ICurrentDialogPayload, meta?: any) => ({
    type: SET_CURRENT_DIALOG,
    payload: currentDialog,
    meta
})

export const CLOSE_CURRENT_DIALOG = 'CLOSE_CURRENT_DIALOG'

export const closeCurrentDialog = () => ({
    type: CLOSE_CURRENT_DIALOG
})
