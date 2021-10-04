import Typography from '@material-ui/core/Typography'
import React, { FC } from 'react'
import { Slide, toast } from 'react-toastify'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import { EToastColor } from './toast.types'
import { EXTRA_COLORS_PALETTE } from '../../../material.theme'
import { AUTO_CLOSE_TIME } from './toast.constants'

export enum SnackBarType {
  Success,
  Error,
  Warning,
  Info,
}

interface IGenericSnackbarProps {
  closeToast?: any;
  toastProps?: any;
  text: string;
  Icon: () => JSX.Element;
  textColor?: string;
}

const GenericSnackbar: FC<IGenericSnackbarProps> = ({
    text,
    Icon,
    textColor = 'white',
}) => (
    <div className="row px-3">
        <Icon />
        <Typography className="mx-2" style={{ color: textColor }}>
            {text}
        </Typography>
    </div>
)

const getColor = (type?: SnackBarType) => {
    switch (type) {
    case SnackBarType.Success:
        return EToastColor.Success
    case SnackBarType.Error:
        return EToastColor.Error
    case SnackBarType.Warning:
        return EToastColor.Warning
    case SnackBarType.Info:
    default:
        return EToastColor.Info
    }
}

const getIcon = (type?: SnackBarType) => {
    switch (type) {
    case SnackBarType.Error:
        return () => <ErrorIcon style={{ color: EXTRA_COLORS_PALETTE.WHITE }} />
    case SnackBarType.Warning:
        return () => <WarningIcon style={{ color: EToastColor.Error }} />
    default:
        return () => (
            <InfoOutlinedIcon style={{ color: EXTRA_COLORS_PALETTE.WHITE }} />
        )
    }
}

const triggerToast = (
    text: string,
    type: SnackBarType,
    customId?: string,
    color?: string
) => {
    toast(
        <GenericSnackbar text={text} Icon={getIcon(type)} textColor={color} />,
        {
            position: toast.POSITION.TOP_CENTER,
            autoClose: AUTO_CLOSE_TIME,
            pauseOnFocusLoss: true,
            toastId: customId ?? text.replace(' ', '_').toUpperCase(),
            transition: Slide,
            hideProgressBar: true,
            draggable: false,
            style: {
                backgroundColor: getColor(type),
            },
        }
    )
}

export const showWarning = (text: string, customId?: string) =>
    triggerToast(text, SnackBarType.Warning, customId, EToastColor.Error)
export const showError = (text: string, customId?: string) =>
    triggerToast(text, SnackBarType.Error, customId)
export const showSuccess = (text: string, customId?: string) =>
    triggerToast(text, SnackBarType.Success, customId)
