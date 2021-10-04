import * as React from 'react'
import {
    CONFIRMATION_DIALOG,
    GENERIC_DIALOG,
    TIME_SHEET_DIALOG,
} from './dialogs.constants'
import { GenericDialog } from './dialogContent/GenericDialog'
import { ConfirmationDialog } from './dialogContent/ConfirmationDialog'
import { TimeSheetDialog } from './dialogContent/TimeSheetDialog'

/**
 * @description
 * Insert here the Dialog Case
 */
export const dialogRenderFactory = (dialogType: string, meta?: any): any => {
    switch (dialogType) {
    case GENERIC_DIALOG:
        return {
            component: <GenericDialog {...meta} />,
            customDialogProps: {
                disableEscapeKeyDown: false,
                disableBackdropClick: false,
            },
        }
    case CONFIRMATION_DIALOG:
        return {
            component: <ConfirmationDialog {...meta} />,
            customDialogProps: {
                disableEscapeKeyDown: false,
                disableBackdropClick: false,
            },
        }
    case TIME_SHEET_DIALOG:
        return {
            component: <TimeSheetDialog {...meta}/>,
            customDialogProps: {
                disableEscapeKeyDown: false,
                disableBackdropClick: false,
            },
        }

    default:
        return <React.Fragment />
    }
}
