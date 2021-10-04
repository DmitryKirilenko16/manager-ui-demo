import {EXTRA_COLORS_PALETTE, EXTRA_CONST_MEASUREMENTS} from '../../material.theme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {important} from '../../react-core/utils/css/important'
import {LAPTOP_DEFAULT_SCREEN} from '../../react-core/core.constants'

export const PAGE_GAP = 30
export const PAGE_SMALL_GAP = 20
export const useDashboardRouteStyles = makeStyles(theme => ({
    content: {
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        padding: PAGE_GAP,
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_DARK,
        [`@media only screen and (max-width: ${LAPTOP_DEFAULT_SCREEN}px)`]: {
            padding: PAGE_SMALL_GAP,
        },
    },
    noPadding: {
        padding: important('0'),
    },
    menuList: {
        marginTop: 15,
    },
    activeMenuLink: {
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_DARK,
        '& .text, & .icon': {
            color: `${EXTRA_COLORS_PALETTE.WHITE} !important`,
        },
    },
    menuLink: {
        display: 'block',
        textDecoration: 'none !important',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        boxSizing: 'border-box',
        '& .list-item': {
            width: '100%',
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            padding: '13px 16px 13px 32px',
            '& .icon, .text': {
                color: EXTRA_COLORS_PALETTE.WHITE,
            },
            '&:hover': {
                background: 'rgb(0 0 0 / 10%)',
            }
        },
    },
    menuHeader: {
        paddingLeft: 32,
        marginTop: 35,
    },
    menuPanel: {
        width: 360,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto',
        paddingRight: 25,
        boxSizing: 'border-box',
        position: 'relative',
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND
    },
    displayNone: {
        display: 'none',
    },
    displayFlex: {
        display: 'flex',
    },
    mainLogo: {
        width: 144,
        display: 'block',
    },
    shortUsersInfo: {
        marginTop: 65,
        '& .avatar': {
            backgroundColor: theme.palette.secondary.main,
            width: 64,
            height: 64,
        },
        '& .name': {
            fontSize: '20px !important',
            fontWeight: 500,
            lineHeight: '24px',
            color: EXTRA_COLORS_PALETTE.WHITE,
            display: 'block',
            marginTop: 15,
        },
        '& .date': {
            fontSize: '12px !important',
            lineHeight: '16px',
            color: '#848594 !important',
            display: 'block',
            marginTop: 3,
        },
        '& .actions': {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 22,
            '& > *': {
                margin: '0 !important',
            },
        },
    },
    contactsLink: {
        textDecoration: important('none'),
    },
    contacts: {
        cursor: 'pointer',
        width: '100%',
        height: 160,
        marginBottom: 30,
        marginLeft: '4%',
        boxSizing: 'border-box',
        position: 'relative',
        background: `${theme.palette.secondary.main} !important`,
        borderRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        padding: '40px 30px',
        '& .settings-img': {
            position: 'absolute',
            height: 160,
            right: 15,
            bottom: -6,
            zIndex: 1,
        },
        '& .text': {
            position: 'relative',
            zIndex: 2,
            display: 'block',
            maxWidth: 130,
            '& > *': {
                color: '#fff',
                fontSize: 20,
                lightHeight: 24,
            },
        },
    },
    hidden: {
        display: important('none'),
    },
    date: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        marginTop: 15
    }
}))
