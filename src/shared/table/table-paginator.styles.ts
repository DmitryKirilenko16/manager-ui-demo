import {Theme} from '@material-ui/core'
import createStyles from '@material-ui/core/styles/createStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {EXTRA_COLORS_PALETTE} from '../../material.theme'

export const usePaginationStyles = makeStyles((theme: Theme) => createStyles({
    paginationControls: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto 16px 16px 16px',
    },
    button: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        width: 40,
        height: 40,
        minWidth: 40,
        border: '1px solid #CFD0D665',
        borderRadius: 4,
        margin: '0px 4px',
        outline: 'none !important',
        '&.active': {
            border: '1px solid #DCDCFE',
            background: '#F0F0FF',
            color: theme.palette.secondary.main,
        },
    },
    iconButton: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        height: 40,
        width: 40,
        margin: '0px 4px',
        outline: 'none !important',
    },
    label: {
        marginRight: 18,
        fontWeight: 500,
        width: 170,
        fontSize: '12px',
        lineHeight: '16px',
        color: EXTRA_COLORS_PALETTE.WHITE,
    },
}))
