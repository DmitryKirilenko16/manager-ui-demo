import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import {themeOptions} from '../material.theme'

export const GenericButton = withStyles(theme => ({
    root: {
        outline: 'none !important',
        minHeight: 40,
        fontSize: 12,
        color: theme.palette.secondary.main,
    },
    contained: {
        backgroundColor: themeOptions.palette.secondary.main,
        color: 'white',
        '&:hover': {
            backgroundColor: themeOptions.palette.secondary.dark,
        },
        '&:disabled': {
            backgroundColor: '#bb86fc61',
            color: 'white',
        },
    },
    outlined: {
        borderColor: theme.palette.secondary.light,
    },
}))(Button)

export default GenericButton
