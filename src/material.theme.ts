import { Theme } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'

export const EXTRA_COLORS_PALETTE = Object.freeze({
    OFFICIAL_BACKGROUND: '#303030',
    OFFICIAL_BACKGROUND_SEMI_DARK: '#212020',
    OFFICIAL_BACKGROUND_DARK: '#151515',
    MANAGER_MAIN: '#391616',
    TEXT_MAIN: 'rgba(0, 0, 0, 0.87)',
    TEXT_GREY_MAIN: 'rgba(0, 0, 0, 0.54)',
    INFO_ICON_MAIN: '#c43030',
    LIGHT_GREY: '#c1c0c0',
    BLACK: '#000000',
    WHITE: '#ffffff',
    OFFLINE_GREY: '#848594',
    DEFAULT_BORDER_COLOR_BLACK: '#1a1a1a',
    INPUT_ERROR: '#f44336',

    BACKDROP_COLOR: 'rgba(128,9,9,0.92)',
    BACKDROP_Z_INDEX: 5,

    SECONDARY: {
        LIGHT: '#ee7f7f',
        MAIN: '#bd2e2e',
        DARK: '#8b1717',
    },
    INFO: {
        MAIN: 'rgba(52,21,21,0.87)',
    },

    GREY: {
        50: '#100b370f',
    },
})

export const EXTRA_CONST_MEASUREMENTS = Object.freeze({
    BOX_RADIUS: 16,
    BOX_SHADOW: '0px 8px 24px rgba(52, 54, 78, 0.15)',
})

export const themeOptions: Theme = createTheme({
    palette: {
        primary: {
            light: EXTRA_COLORS_PALETTE.TEXT_MAIN,
            main: EXTRA_COLORS_PALETTE.TEXT_MAIN,
            dark: EXTRA_COLORS_PALETTE.TEXT_MAIN,
        },
        secondary: {
            light: EXTRA_COLORS_PALETTE.SECONDARY.LIGHT,
            main: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
            dark: EXTRA_COLORS_PALETTE.SECONDARY.DARK,
        },
        info: {
            light: EXTRA_COLORS_PALETTE.TEXT_GREY_MAIN,
            main: EXTRA_COLORS_PALETTE.INFO.MAIN,
        },
        background: {
            default: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
            paper: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_DARK,
        },
        grey: {
            50: EXTRA_COLORS_PALETTE.GREY['50'],
        },
    },

    overrides: {
        MuiButton: {
            iconSizeMedium: {
                '& > *:first-child': {
                    fontSize: 28,
                    height: 24,
                    display: 'flex',
                },
            },
        },
        MuiChip: {
            root: {
                backgroundColor: 'transparent',
                color: '#000',
            },
            colorPrimary: {
                borderColor: '#fff',
                color: '#fff',
                backgroundColor:  EXTRA_COLORS_PALETTE.OFFLINE_GREY,
                '$clickable&:hover, $clickable&:focus': {
                    backgroundColor: EXTRA_COLORS_PALETTE.OFFLINE_GREY,
                },
            },
            colorSecondary: {
                borderColor: '#fff',
                color: '#fff',
                backgroundColor:  EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
                '$clickable&:hover, $clickable&:focus': {
                    backgroundColor: EXTRA_COLORS_PALETTE.SECONDARY.LIGHT,
                },
            },
        }
    },
})
