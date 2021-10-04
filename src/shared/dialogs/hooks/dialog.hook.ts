import { closeCurrentDialog, setCurrentDialog } from '../redux/dialogs.actions'
import { EDialogSizes } from '../dialogs.types'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import {
    CONFIRMATION_DIALOG,
    DialogType, TIME_SHEET_DIALOG,
} from '../dialogs.constants'

/** Returns the function to show dialog */

export const useDialog = <T = {}>(
    type: DialogType,
    size: EDialogSizes = EDialogSizes.SM
) => {
    const dispatch = useDispatch()
    return (props?: T) => {
        dispatch(setCurrentDialog({ type, size }, props))
    }
}

export type IUseConfirmationDialogReturnedType = (
  content: IConfirmDialogContent,
  callback: () => any,
  _size?: EDialogSizes,
  cancelCallback?: () => void
) => void

export interface IConfirmDialogContent {
  i18nTitle: string;
  i18nSubtitle?: string;
}

export function useConfirmationDialog(
    size: EDialogSizes = EDialogSizes.SM
): IUseConfirmationDialogReturnedType {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return useCallback(
        (
            content: IConfirmDialogContent,
            callback: () => any,
            _size = size,
            cancelCallback?: () => void
        ) => {
            dispatch(
                setCurrentDialog(
                    { type: CONFIRMATION_DIALOG, size: _size },
                    {
                        dialogTitle: t(content.i18nTitle),
                        dialogSubtitle: t(content.i18nSubtitle || ''),
                        actionAgree: async () => {
                            await callback()
                            dispatch(closeCurrentDialog())
                        },
                        actionClose: () => cancelCallback?.(),
                    }
                )
            )
        },
        [dispatch, t, size]
    )
}

export const useSocialNetworkDialog = (
    size: EDialogSizes = EDialogSizes.SM
) => {
    return useDialog(TIME_SHEET_DIALOG, size)
}
