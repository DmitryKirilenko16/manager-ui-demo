import makeStyles from '@material-ui/core/styles/makeStyles'
import {EXTRA_COLORS_PALETTE, EXTRA_CONST_MEASUREMENTS} from '../../../material.theme'

export const useHeaderStepperStyles = makeStyles((theme) => ({
    stepper: {
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
        color: EXTRA_COLORS_PALETTE.WHITE,
        display: 'flex',
        width: '100%',
        height: 'fit-content',
        padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
        boxShadow: EXTRA_CONST_MEASUREMENTS.BOX_SHADOW,
        flexWrap: 'wrap',
        zIndex: 1,
        '& *': {
            transition: '200ms',
        },
    },
    step: {
        display: 'flex',
        width: 300,
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: EXTRA_COLORS_PALETTE.WHITE,
        color: theme.palette.secondary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(2),
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: '#F0F0FF',
        },
    },
    label: {},
}))
