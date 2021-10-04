import { createStyles, darken, makeStyles } from '@material-ui/core'
import {
    EXTRA_COLORS_PALETTE,
    EXTRA_CONST_MEASUREMENTS,
} from '../../material.theme'
import { LAPTOP_DEFAULT_SCREEN } from '../../react-core/core.constants'
import { important } from '../../react-core/utils/css/important'

const CELL_BORDER = '1px solid #F1F0F3 !important'
const LAPTOP_CSS_BLOCK = {
    [`@media only screen and (max-width: ${LAPTOP_DEFAULT_SCREEN}px)`]: {
        padding: '10px !important',
        height: 'auto',
    },
}

export const useTableStyles = makeStyles((theme) =>
    createStyles({
        timeSheetTitle: {
            fontSize: 18,
            marginBottom: 5,
        },
        eventContentContainer: {
            padding: '0 5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        eventsSvg: {
            height: 20,
            width: 20,
        },
        eventHours: {
            display: 'flex',
            alignItems: 'center',
        },
        test: {
            color: EXTRA_COLORS_PALETTE.WHITE,

            '& .fc-past-month': {
                background: important('red'),
            },

            '& .fc-button-primary': {
                background: important(EXTRA_COLORS_PALETTE.SECONDARY.MAIN),
            },

            '& .fc-event-title-container, .fc-event': {
                background: important(EXTRA_COLORS_PALETTE.SECONDARY.MAIN),
                border: `1px solid ${EXTRA_COLORS_PALETTE.SECONDARY.MAIN}`,
            },

            '& .fc-popover': {
                background: important(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND),
                border: `1px solid ${EXTRA_COLORS_PALETTE.SECONDARY.MAIN}`,
            },

            '& .fc-scroller': {
                overflow: important('hidden'),
            },

            '& .fc-day-sun, .fc-day-sat': {
                backgroundColor: important('#616161'),
                '&:hover': {
                    backgroundColor: important('#616161'),
                },
            },

            '& .fc-button': {
                minWidth: 100,
            },

            // "& .fc-day-today": {
            //   background: important(EXTRA_COLORS_PALETTE.SECONDARY.LIGHT),
            // },
        },
        popoverHidden: {
            '& .fc-popover': {
                display: 'none',
            },
        },
        paddings: {
            padding: 20,
        },
        weekends: {
            '&:hover': {
                background: important(darken(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND, 0.2)),
            },
            '.fc-other-month': {
                background: important('red'),
            },
        },
        paper: {
            boxShadow: EXTRA_CONST_MEASUREMENTS.BOX_SHADOW,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
            borderRadius: EXTRA_CONST_MEASUREMENTS.BOX_RADIUS,
        },
        tableContainer: {
            height: '100%',
            overflowY: 'hidden',
        },
        headCell: {
            color: EXTRA_COLORS_PALETTE.LIGHT_GREY,
            borderTop: CELL_BORDER,
            borderBottom: CELL_BORDER,
            paddingTop: 16,
            ...LAPTOP_CSS_BLOCK,
        },
        row: {
            backgroundColor: 'inherit',
            transition: '200ms',
            '&:hover': {
                backgroundColor: darken(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND, 0.2),
                '& td, & svg': {
                    color: theme.palette.secondary.main,
                },
            },
        },
        list: {
            height: '100%',
        },
        cell: {
            color: EXTRA_COLORS_PALETTE.WHITE,
            cursor: 'pointer',
            height: 50,
            boxSizing: 'border-box',
            fontStyle: 'normal',
            fontWeight: 450,
            fontSize: 14,
            lineHeight: '22px',
            whiteSpace: 'nowrap',
            ...LAPTOP_CSS_BLOCK,
        },
        lastCell: {
            borderBottom: 'none',
        },
        pagination: {
            marginTop: 20,
        },
        emptyList: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: 50,
            '& > .MuiTypography-root': {
                fontSize: 16,
                color: EXTRA_COLORS_PALETTE.TEXT_GREY_MAIN,
                fontWeight: 'lighter',
            },
        },
        header: {
            color: EXTRA_COLORS_PALETTE.WHITE,
            padding: theme.spacing(2),
            fontWeight: 500,
            fontSize: 20,
            lineHeight: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& button': {
                color: theme.palette.secondary.main,
                '& svg': {
                    color: '#AFAFF8',
                },
            },
        },
    })
)
