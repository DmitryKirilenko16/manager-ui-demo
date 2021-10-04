import makeStyles from '@material-ui/core/styles/makeStyles'
import {
    EXTRA_COLORS_PALETTE,
    EXTRA_CONST_MEASUREMENTS,
} from '../../material.theme'
import { LAPTOP_DEFAULT_SCREEN } from 'react-core/core.constants'
import { important } from 'react-core/utils/css/important'
import { flex } from 'react-core/utils/css/styles.utils'
import { darken } from '@material-ui/core'

export const useCardTableStyles = makeStyles((theme) => ({
    card: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK,
        marginBottom: theme.spacing(4),
        borderRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        minWidth: 330,
        width: '100%',
        marginTop: 50,
        '& button .MuiSvgIcon-root': {
            color: EXTRA_COLORS_PALETTE.WHITE,
        },
        wordBreak: 'break-all',
    },
    cardInfo: {
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK,
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        gap: 15,
    },
    cardHeader: {
        paddingLeft: 16,
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
        borderBottom: `1px solid ${EXTRA_COLORS_PALETTE.WHITE}`,
        '& .subheader': {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            '& > .tip': {
                fontSize: 12,
            },
        },
        '& .MuiCardHeader-action': {
            '& .MuiCardActions-root': {
                padding: 0,
            },
            margin: 0,
        },
        '& .MuiCardHeader-content': {
            '& span > .title': {
                fontSize: 20,
                fontWeight: 545,
            },
        },
        [`@media only screen and (max-width: ${LAPTOP_DEFAULT_SCREEN}px)`]: {
            padding: '10px 10px 10px 16px !important',
            '& .MuiCardHeader-content': {
                '& span > .title': {
                    fontSize: '17px !important',
                },
            },
        },
    },
    semiDarkHeader: {
        background: important(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK),
    },
    cardFooter: {
        borderTop: '1px solid #100b370f',
        alignItems: 'center',
        display: 'flex',
        padding: 20,
        [`@media only screen and (max-width: ${LAPTOP_DEFAULT_SCREEN}px)`]: {
            padding: '10px 13px !important',
        },
    },
    itemCard: {
        boxShadow: important('none'),
        width: 'fit-content',
        backgroundColor: important('transparent')
    },
    avatarSkeleton: {
        width: 40,
        height: 40,
        borderRadius: '50%',
    },
    nestedHeader: {
        '& .MuiCardHeader-content': {
            '& span': {
                color: EXTRA_COLORS_PALETTE.WHITE,
                fontSize: 14,
                display: 'block',
                '> &:first-child': {
                    color: theme.palette.info.main,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
                '> &:last-child': {
                    color: '#848594DF',
                    fontWeight: 'normal !important',
                    lineHeight: '20px',
                },
            },
        },
        color: EXTRA_COLORS_PALETTE.WHITE
    },
    actionButton: {
        color: important(EXTRA_COLORS_PALETTE.WHITE),
        background: important(EXTRA_COLORS_PALETTE.SECONDARY.MAIN),
        outline: 'none !important',

        '&:hover': {
            background: darken(EXTRA_COLORS_PALETTE.SECONDARY.MAIN, 0.2),
        },
    },

    actionButtonDisabled: {
        background: important(darken(EXTRA_COLORS_PALETTE.SECONDARY.MAIN, 0.5)),
    },
    info: {
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK,
        transition: '200ms',
        color: EXTRA_COLORS_PALETTE.WHITE,
        marginBottom: 18,
        '& b': {
            color: EXTRA_COLORS_PALETTE.WHITE,
        },
        '& span': {
            marginBottom: 10,
        },
    },
    timeSheetDialogInfo: {
        marginBottom: important('14px'),
    },
    formField: {
        width: '100%',
    },
    form: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(3),
        flexWrap: 'wrap',
        '& > .formFieldWrap': {
            width: important('30%'),
            '& > *': {
                width: '100%',
                '& .inputIcon': {
                    color: EXTRA_COLORS_PALETTE.OFFLINE_GREY
                }
            }
        }
    },
    tableContent: {
        ...flex(),
    },
    actionRightButtonWrap: {
        minWidth: 120,
        alignSelf: 'center',
    },
    usersDetailsBackground: {
        background: important(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND),
    },
}))

export type TCardTableStyles = ReturnType<typeof useCardTableStyles>
