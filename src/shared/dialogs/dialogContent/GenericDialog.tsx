import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import * as React from 'react'
import Button from '@material-ui/core/Button'
import {closeCurrentDialog} from '../redux/dialogs.actions'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

interface ITestDialogProps {
    dialogTitle: string
    dialogTextContent: string
    dialogCustomContent?: any
    actionClose?: () => any
    actionCloseLabel: string
    actionAgree?: () => any
    actionAgreeLabel?: string
}

export const GenericDialog: React.FC<ITestDialogProps> = props => {

    const dispatch = useDispatch()

    const {t} = useTranslation()

    const {
        actionAgree,
        actionAgreeLabel,
        actionClose,
        actionCloseLabel,
        dialogTitle,
        dialogTextContent,
        dialogCustomContent
    } = props

    const ACTION_CLOSE_LABEL = actionCloseLabel ? actionCloseLabel : 'generic_label_close'
    const ACTION_AGREE_LABEL = actionAgreeLabel ? actionAgreeLabel : 'generic_label_agree'

    const handleClose = () => {
        actionClose && actionClose()
        !actionClose && console.info('YOU CAN ADD A CUSTOM CLOSE ACTION')
        dispatch(closeCurrentDialog())
    }

    const handleAgree = () => {
        actionAgree && actionAgree()
        !actionAgree && dispatch(closeCurrentDialog()) && console.info('YOU CAN ADD A CUSTOM AGREE ACTION')
    }

    return (
        <>
            {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
            <DialogContent>
                {dialogTextContent &&
                <DialogContentText>
                    {t(dialogTextContent)}
                </DialogContentText>}
                {dialogCustomContent}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {t(ACTION_CLOSE_LABEL)}
                </Button>
                <Button onClick={handleAgree}>
                    {t(ACTION_AGREE_LABEL)}
                </Button>
            </DialogActions>
        </>
    )
}
