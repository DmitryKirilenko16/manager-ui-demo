import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import * as React from 'react'
import Button from '@material-ui/core/Button'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone'
import {closeCurrentDialog} from '../redux/dialogs.actions'
import {useDispatch} from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import {useDialogStyles} from '../dialog.styles'

interface IConfirmationDialogProps {
    dialogTitle: string
    dialogSubtitle?: string,
    actionClose?: () => any
    actionCloseLabel: string
    actionAgree?: () => any
    actionAgreeLabel?: string
}

export const ConfirmationDialog: React.FC<IConfirmationDialogProps> = props => {

    const dispatch = useDispatch()
    const classes = useDialogStyles()

    const {
        actionAgree,
        actionAgreeLabel,
        actionClose,
        actionCloseLabel,
        dialogTitle,
        dialogSubtitle,
    } = props

    const ACTION_CLOSE_LABEL = actionCloseLabel ?? 'Back'
    const ACTION_AGREE_LABEL = actionAgreeLabel ?? 'Yes, I confirm'

    const handleClose = () => {
        actionClose && actionClose()
        dispatch(closeCurrentDialog())
    }

    const handleAgree = () => {
        actionAgree && actionAgree()
    }

    return (
        <div className={classes.dialogWrap}>
            <DialogContent>
                <CloseIcon className={classes.closeIcon} onClick={() => dispatch(closeCurrentDialog())}/>
                <div className={classes.icon}><InfoTwoToneIcon/></div>

                {dialogTitle && <DialogTitle style={{paddingLeft: 0}}>{dialogTitle}</DialogTitle>}

                {
                    dialogSubtitle && (
                        <DialogContentText>
                            {(dialogSubtitle)}
                        </DialogContentText>
                    )
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={handleAgree} className={classes.button}>
                    {(ACTION_AGREE_LABEL)}
                </Button>
                <Button onClick={handleClose} className={classes.button}>
                    {(ACTION_CLOSE_LABEL)}
                </Button>
            </DialogActions>
        </div>
    )
}
