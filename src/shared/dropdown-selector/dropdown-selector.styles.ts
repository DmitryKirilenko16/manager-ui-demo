import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {important} from '../../react-core/utils/css/important'
import {EXTRA_COLORS_PALETTE} from '../../material.theme'

export const useDropdownSelectorStyles = makeStyles((theme: Theme) =>
    createStyles({
        selectorContainer: {
            margin: `${theme.spacing(0.5)}px 0 ${theme.spacing(0.5)}px`,
            width: '100%',
            color: important(EXTRA_COLORS_PALETTE.WHITE),
        },
        selectorUsersContainer: {
            width: '210px',
            margin: 0,
            border: 'none'
        },
        formControl: {
            width: '100%',
            background: 'transparent',
            border: `2px solid ${EXTRA_COLORS_PALETTE.OFFLINE_GREY}`,
            borderRadius: 6,

            '& svg': {
                color: important(EXTRA_COLORS_PALETTE.WHITE),
            },
        },
        selector: {
            color: important(EXTRA_COLORS_PALETTE.WHITE),
            transition: '200ms',
            padding: 5,
        },
        label: {
            margin: '5px 0 0 5px',
            color: important(EXTRA_COLORS_PALETTE.WHITE),
        },
        menuItem: {
            color: important(EXTRA_COLORS_PALETTE.WHITE),
        },
        semiDarkBgc: {
            background: important(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK),
        },

        disabled: {
            borderColor: important(EXTRA_COLORS_PALETTE.GREY),
            '& svg': {
                display: 'none',
            },
        },
    })
)
