import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import { TextFieldProps } from '@material-ui/core/TextField/TextField'
import { EXTRA_COLORS_PALETTE } from '../material.theme'


export const GenericInput: React.ComponentType<TextFieldProps> = React.memo(
    withStyles((theme) =>
        createStyles({
            root: {
                color: theme.palette.secondary.main,
                '& *': {
                    outline: 'none !important',
                },
                '& .MuiSvgIcon-root': {
                    transition: '200ms',
                },
                '& label': {
                    color: EXTRA_COLORS_PALETTE.WHITE
                },
                '& label.Mui-focused': {
                    color: EXTRA_COLORS_PALETTE.WHITE,
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-disabled, & .Mui-disabled': {
                        pointerEvents: 'none',
                        color: theme.palette.info.light,
                        '& .MuiSvgIcon-root': {
                            opacity: 0,
                        },
                        '& fieldset': {
                            borderColor: EXTRA_COLORS_PALETTE.OFFLINE_GREY,
                        },
                    },
                    '& fieldset': {
                        borderColor: EXTRA_COLORS_PALETTE.OFFLINE_GREY,
                        borderWidth: 2,
                        transition: '200ms',
                    },
                    '& .MuiInputAdornment-root': {
                        color: EXTRA_COLORS_PALETTE.WHITE,
                    },
                    '&:hover:not(.Mui-focused):not(.Mui-error)': {
                        '& fieldset, & .MuiInputAdornment-root': {
                            borderColor: EXTRA_COLORS_PALETTE.LIGHT_GREY,
                            color: EXTRA_COLORS_PALETTE.WHITE,
                        },
                    },
                    '&.Mui-focused': {
                        '& fieldset, & .MuiInputAdornment-root': {
                            borderColor: EXTRA_COLORS_PALETTE.LIGHT_GREY,
                            color: EXTRA_COLORS_PALETTE.WHITE,
                        },
                        '& .MuiIconButton-root': {
                            color: EXTRA_COLORS_PALETTE.WHITE,
                        },
                    },
                    '& MuiInputAdornment-root': {
                        color: '#A9AAB4',
                    },
                    '& input': {
                        color: EXTRA_COLORS_PALETTE.WHITE,
                        '&:disabled': {
                            color: EXTRA_COLORS_PALETTE.WHITE,
                        },
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        appearance:'none',
                    },
                },
            },
        })
    )(TextField)
)

export default GenericInput
