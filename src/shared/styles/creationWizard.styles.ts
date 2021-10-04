import makeStyles from '@material-ui/core/styles/makeStyles'
import { EXTRA_COLORS_PALETTE } from '../../material.theme'
import { flex, responsive } from '../../react-core/utils/css/styles.utils'
import { EToastColor } from '../../react-core/components/toast/toast.types'
import { darken, lighten } from '@material-ui/core'
import { important } from '../../react-core/utils/css/important'

export const useCreationWizardStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    overflowWrapper: {
        display: 'flex',
        overflow: 'auto',
        width: '100%',
        justifyContent: 'center',
        height: '100%',
    },
    content: {
        minWidth: 700,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        flexWrap: 'nowrap',
        '@media only screen and (max-width:800px)': {
            flexWrap: 'wrap',
        },
        '& > :first-child': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: 800,
            width: '100%',
            position: 'relative',
            paddingTop: theme.spacing(6),
        },
        '& > :last-child': {
            display: 'flex',
            maxWidth: 700,
            flexBasis: 700,
        },
    },
    info: {
        transition: '200ms',
        color: EXTRA_COLORS_PALETTE.WHITE,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6),
        '& b': {
            color: theme.palette.info.main,
        },
        '& span': {
            marginBottom: theme.spacing(12),
        },
        ...responsive({
            marginBottom: theme.spacing(6),
        }),
    },
    navigation: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        justifySelf: 'flex-end',
        margin: `${theme.spacing(10)}px 0 ${theme.spacing(3)}px`,
        flexDirection: 'row',
        '& > :first-child': {
            marginBottom: theme.spacing(1),
        },
        '& > :last-child': {
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 370,
            justifyContent: 'space-between',
            width: '100%',
            '@media only screen and (max-width:400px)': {
                justifyContent: 'center',
                maxWidth: '240px',
            },
        },
        '& button': {
            maxWidth: 180,
            width: '100%',
            marginBottom: theme.spacing(1),
            height: 50,
            fontWeight: 700,
            '&:first-child': {
                marginRight: theme.spacing(1),
                '@media only screen and (max-width: 830px)': {
                    marginRight: 0,
                },
            },
            '&:last-child': {
                justifyContent: 'space-between',
            },
        },
        '@media only screen and (max-width:400px)': {
            flexDirection: 'column',
        },
        '& .buttons': {
            [theme.breakpoints.down('sm')]: {
                ...flex(),
                flexWrap: 'nowrap',
                flexDirection: 'row',
                gap: 20,
            },
        },
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'nowrap',
            flexDirection: 'row',
            margin: 0,
            justifyContent: 'flex-start',
            gap: 15,
        },
    },
    stepCounter: {
        fontSize: 16,
        color: EXTRA_COLORS_PALETTE.WHITE,
        lineHeight: '24px',
        marginRight: theme.spacing(1),
    },
    wizardButtons: {
        marginLeft: 20,
    },
    wizardBackButton: {
        background: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        color: EXTRA_COLORS_PALETTE.WHITE,

        '&:hover': {
            background: darken(EXTRA_COLORS_PALETTE.SECONDARY.MAIN, 0.2),
        },
    },
    wizardDisabledButton: {
        '&:disabled': {
            background: EXTRA_COLORS_PALETTE.INFO.MAIN,
        },
    },
    spinner: {
        width: '20px!important',
        height: '20px!important',
        color: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
        marginLeft: theme.spacing(1),
    },
    errorMessage: {
        color: EToastColor.Error,
        fontSize: 13,
    },
}))

export const useCreationStepStyles = makeStyles((theme) => ({
    root: {
        color: EXTRA_COLORS_PALETTE.WHITE,
        width: '100%',
        maxWidth: 1000,
        display: 'flex',
        flexWrap: 'wrap',
        height: 'inherit',
        position: 'relative',
        '@media only screen and (max-width: 1200px)': {
            width: 600,
            '@media only screen and (max-width: 1000px)': {
                width: 400,
                '@media only screen and (max-width: 800px)': {
                    width: 600,
                    '@media only screen and (max-width: 620px)': {
                        width: 400,
                        '@media only screen and (max-width: 450px)': {
                            width: 350,
                            '@media only screen and (max-width: 400px)': {
                                width: 250,
                            },
                        },
                    },
                },
            },
        },
    },
    subtitle: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        margin: `${theme.spacing(2)}px 0 ${theme.spacing(6)}px`,
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: theme.spacing(-3),
        },
        '& .Mui-disabled': {
            color: EXTRA_COLORS_PALETTE.LIGHT_GREY,
        },
    },
    disabled: {
        border: `2px solid ${important(EXTRA_COLORS_PALETTE.OFFLINE_GREY)}`,
        borderRadius: 6,
        margin: important('0px'),
    },
    textArea: {
        maxWidth: '100%',
        minWidth: '100%',
        minHeight: important('56px'),
        maxHeight: important('220px'),
        background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
        padding: '18.5px 14px',
        color: EXTRA_COLORS_PALETTE.WHITE,
        borderColor: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        borderWidth: 2,
        borderRadius: 4,
        fontSize: 16,
        transition: 'border-color 0.2s',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.75,

        '&:focus, &:focus-visible': {
            borderColor: important(EXTRA_COLORS_PALETTE.SECONDARY.DARK),
            outline: important('none'),
        },

        '&::placeholder': {
            color: EXTRA_COLORS_PALETTE.WHITE,
        },
    },

    semiDark: {
        background: important(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK),
    },

    textAreaError: {
        borderColor: important(EXTRA_COLORS_PALETTE.INPUT_ERROR),

        '&::placeholder': {
            fontFamily: important('Roboto, Helvetica, Arial, sans-serif'),
            color: EXTRA_COLORS_PALETTE.INPUT_ERROR,
        },
    },

    textAreaErrorText: {
        margin: '3px 14px',
        fontSize: ' 0.75rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        letterSpacing: '0.03333em',
        color: important(EXTRA_COLORS_PALETTE.INPUT_ERROR),
        position: 'absolute',
        opacity: 0,
    },

    textAreaErrorTextVisible: {
        opacity: 1,
    },

    //TODO
    popupInput: {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(4.5)}px`,
    },
    icon: {
        fontSize: 20,
        color: EXTRA_COLORS_PALETTE.INFO_ICON_MAIN,
        marginLeft: theme.spacing(0.5),
    },
    inputRow: {
        display: 'flex',
        width: '100%',
        flexWrap: 'nowrap',
        '& > div': {
            marginRight: theme.spacing(2),
            '&:last-child': {
                marginRight: 0,
            },
        },
        '@media only screen and (max-width: 400px)': {
            flexWrap: 'wrap',
            '& > div': {
                marginRight: 0,
            },
        },
    },
}))

export default useCreationWizardStyles
