import makeStyles from '@material-ui/core/styles/makeStyles'
import { EXTRA_COLORS_PALETTE } from '../../material.theme'
import { darken } from '@material-ui/core'
import { important } from '../../react-core/utils/css/important'

export const useDialogStyles = makeStyles((theme) => ({
    dialogWrap: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        position: 'relative',
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
    },
    usersWidth: {
        width: 210,
        height: 56,
        margin: 0,
    },
    dialogActions: {
        justifyContent: 'space-between',
        padding: theme.spacing(3),
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        color: EXTRA_COLORS_PALETTE.WHITE,
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: '24px',
        letterSpacing: 0.1,
    },
    icon: {
        width: 60,
        height: 60,
        backgroundColor: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        color: EXTRA_COLORS_PALETTE.WHITE,
    },
    closeIcon: {
        position: 'absolute',
        right: 25,
        top: 25,
        color: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        cursor: 'pointer',
        display: 'block',
    },
    button: {
        background: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        color: EXTRA_COLORS_PALETTE.WHITE,
        '&:hover': {
            background: darken(EXTRA_COLORS_PALETTE.SECONDARY.MAIN, 0.2),
        },
        '& .MuiButton-label': {
            padding: '0 5px',
        },
    },
    bgcDefault: {
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
    },
    popupContainer: {
        borderRadius: 16,
        padding: '15px 20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
        maxWidth: 700,
        minWidth: 600,
    },
    popupCreateButtons: {
        marginLeft: 'auto',
        width: 'fit-content',
    },
    popupCreateButton: {
        minWidth: 110,

        '&:last-child': {
            marginLeft: 20,
        },
    },
    disabled: {
        background: important(darken(EXTRA_COLORS_PALETTE.SECONDARY.MAIN, 0.5)),
    },
}))
