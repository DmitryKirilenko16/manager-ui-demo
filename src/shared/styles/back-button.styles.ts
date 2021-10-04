import makeStyles from '@material-ui/core/styles/makeStyles'
import {EXTRA_COLORS_PALETTE} from '../../material.theme'

export const useBackButtonStyles = makeStyles((theme) => ({
    backButton: {
        marginRight: theme.spacing(3),
        whiteSpace: 'nowrap',
        padding: '10px 20px',
        color: EXTRA_COLORS_PALETTE.WHITE,
        background: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        maxWidth: '80%',
        borderRadius: 10,
        '&:hover': {
            backgroundColor: EXTRA_COLORS_PALETTE.SECONDARY.DARK,
        },
        '&.disabled': {
            backgroundColor: '#ccc',
        },
    },
    bold: {
        fontWeight: 600,
    },
    actionButton: {
        color: theme.palette.secondary.main,
        outline: 'none',
    },
}))
