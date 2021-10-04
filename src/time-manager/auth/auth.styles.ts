import {darken, makeStyles} from '@material-ui/core'
import { EXTRA_COLORS_PALETTE } from '../../material.theme'

export const useAuthClasses = makeStyles((theme) => ({

    /** Login */
    loginContainer: {
        width: '100%',
        height: '100%',
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_DARK,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    authContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%'
    },

    authButton: {
        height: '40px',
        marginTop: '25px',
        background: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        color: EXTRA_COLORS_PALETTE.WHITE,

        '&:hover': {
            background: darken(EXTRA_COLORS_PALETTE.SECONDARY.MAIN, 0.2),
        },

        '.MuiIcon-root': {
            display: 'none;'
        }
    }

}))
