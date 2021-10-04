import makeStyles from '@material-ui/core/styles/makeStyles'
import {EXTRA_COLORS_PALETTE, EXTRA_CONST_MEASUREMENTS} from 'material.theme'
import {PAGE_GAP, PAGE_SMALL_GAP} from '../../dashboard-route.styles'
import {responsive} from '../../../../react-core/utils/css/styles.utils'
import {RESET_BOX_SHADOW_CSS_BLOCK, TEXT_OVERFLOW_CSS_BLOCK} from '../../../../shared/styles/shared.styles'
import {important} from '../../../../react-core/utils/css/important'
import {LAPTOP_DEFAULT_SCREEN} from '../../../../react-core/core.constants'

const BLOCK_HEIGHT = 165
const FIXED_BUTTONS_COUNT = 3

const SMALL_SCREEN_GAP_BLOCK = {
    ...responsive({
        gap: PAGE_SMALL_GAP
    })
}

export const useHomePageStyles = makeStyles(() => ({
    welcomeBlock: {
        boxShadow: 'none !important',
        borderRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        backgroundSize: 'cover',
        display: 'flex',
        padding: `${PAGE_GAP}px 20px`,
        boxSizing: 'border-box',
        alignItems: 'center',
        flexDirection: 'row',
        height: BLOCK_HEIGHT,
        width: '100%',
        '& .part': {
            position: 'relative',
            '&:first-child': {
                width: '60%',
                zIndex: 2,
            },
            '&:last-child': {
                width: '40%',
                zIndex: 1,
            },
            '& .text': {
                color: '#fff',
                textAlign: 'left',
                display: 'block',
                '&:first-child': {
                    fontSize: 32,
                    lineHeight: '36px',
                    fontWeight: 600,
                },
                '&:last-child': {
                    fontWeight: 400,
                    fontSize: '14px',
                },
            },
        },
    },
    welcomeImgBlock: {
        '& .welcomeImg': {
            position: 'absolute',
            top: -97,
            right: 0,
            width: 250,
        },
    },
    counterBlock: {
        boxShadow: 'none !important',
        borderRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        height: BLOCK_HEIGHT,
        padding: `${PAGE_GAP}px 20px`,
        '& .total': {
            fontWeight: 600,
            fontSize: 46,
            lightHeight: '48px',
            color: EXTRA_COLORS_PALETTE.INFO.MAIN,
        },
        '& .descriptionBlock': {
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            '& .title': {
                lightHeight: '24px',
                fontSize: 20,
                fontWeight: 500,
                ...TEXT_OVERFLOW_CSS_BLOCK,
            },
        },
        '& .counterBlockContainer': {
            display: 'flex',
            flexDirection: 'column',
            '& .counterBlockRow': {
                width: '100%',
                display: 'flex',
                '&:last-child': {
                    justifyContent: 'space-between',
                },
            },
        },
    },
    arrowBlock: {
        '& .arrow': {
            marginTop: 30,
            display: 'flex',
            '& .text': {
                fontSize: 12,
                fontWeight: 700,
            },
        },
    },
    icon: {
        ...RESET_BOX_SHADOW_CSS_BLOCK,
        padding: 15,
        borderRadius: '50%',
    },
    ctaButtonsBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 150,
        boxShadow: EXTRA_CONST_MEASUREMENTS.BOX_SHADOW,
        borderRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        cursor: 'pointer',
        alignItems: 'center',
        '& > div': {
            display: 'flex',
        },
        '& .subtitle': {
            fontSize: 22,
            fontWeight: 600,
        },
        '& .addButton': {},
    },
    mainWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: PAGE_GAP,
        width: '100%',
        height: '100%',
        ...SMALL_SCREEN_GAP_BLOCK,
    },
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        gap: PAGE_GAP,
        ...SMALL_SCREEN_GAP_BLOCK,
        '& .headerPart': {
            flexBasis: '50%',
            display: 'flex',
            gap: PAGE_GAP,
            ...SMALL_SCREEN_GAP_BLOCK,
            '& .counterBlock': {
                flexBasis: '50%',
            },
            '& .counterBlockFullWidth': {
                flexBasis: important('100%'),
            },
        },
        '& .headerLeftPart': {
            flexBasis: important('70%'),
        },
        '& .headerRightPart': {
            flexBasis: important('30%'),
        },
        '@media only screen and (max-width: 1280px)': {
            flexWrap: 'wrap',
            '& .headerPart': {
                flexBasis: '100% !important',
            },
        },
    },
    tableWrap: {
        display: 'flex',
        width: '100%',
        gap: PAGE_GAP,
        height: 'calc(100vh - 435px)',
        [`@media only screen and (max-width: ${LAPTOP_DEFAULT_SCREEN}px)`]: {
            height: 'calc(100vh - 395px)',
        },
        ...SMALL_SCREEN_GAP_BLOCK,
        '& .table': {
            width: 'calc(50% - 10px)',
            height: 'inherit',
            margin: '0 !important',
            '& > *': {
                height: '100%',
                overflowY: 'hidden',
            },
        },
        '& .fullTable': {
            width: important('100%'),
        }
    },
    ctaButtonsWrap: {
        marginTop: 'auto',
        width: '100%',
        display: 'flex',
        bottom: 0,
        gap: PAGE_GAP,
        borderTopLeftRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        borderTopRightRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        ...SMALL_SCREEN_GAP_BLOCK,
        '& > *': {
            width: `${100 / FIXED_BUTTONS_COUNT}%`,
        },
    },
    reportWrap: {
        display: 'flex',
        gap: PAGE_GAP,
        ...SMALL_SCREEN_GAP_BLOCK
    }
}))
