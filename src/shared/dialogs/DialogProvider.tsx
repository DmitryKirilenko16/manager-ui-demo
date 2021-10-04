import * as React from 'react'
import {useEffect} from 'react'
import {Dispatch} from 'redux'
import {connect, useDispatch} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import {closeCurrentDialog} from './redux/dialogs.actions'
import {dialogRenderFactory} from './DialogRenderFactory'
import {currentDialogMetaSelector, currentDialogSizeSelector, currentDialogTypeSelector} from './redux/dialogs.reducers'

const DialogProviderFC: React.FC<IMSTP & IMDTP> = props => {

    const {currentDialogType, currentDialogMeta, currentDialogSize} = props

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeCurrentDialog())
    }

    useEffect(() => {
        console.debug('CURRENT DIALOG: ', currentDialogType)
    }, [currentDialogType])

    const dialogObj = currentDialogType ? dialogRenderFactory(currentDialogType, currentDialogMeta) : {}

    return (
        <Dialog
            {...dialogObj.customDialogProps}
            open={!!currentDialogType}
            onClose={handleClose}
            maxWidth={currentDialogSize}
            fullWidth={true}
        >
            {currentDialogType ? dialogObj.component : <React.Fragment/>}
        </Dialog>
    )
}

interface IMSTP {
    currentDialogType: string | null
    currentDialogMeta: any | undefined
    currentDialogSize: string | null
}

const mStP = (state: any): IMSTP => ({
    currentDialogType: currentDialogTypeSelector(state),
    currentDialogMeta: currentDialogMetaSelector(state),
    currentDialogSize: currentDialogSizeSelector(state)
})

interface IMDTP {
    closeDialog: () => void
}

const mDtP = (dispatch: Dispatch): IMDTP => ({
    closeDialog: () => dispatch(closeCurrentDialog())
})

export const DialogProvider = connect<IMSTP, IMDTP>(mStP, mDtP)(DialogProviderFC)
