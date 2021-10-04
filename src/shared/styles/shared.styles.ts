import { makeStyles } from '@material-ui/core'

export const TEXT_OVERFLOW_CSS_BLOCK = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}

export const RESET_BOX_SHADOW_CSS_BLOCK = {
    boxShadow: 'none !important',
}

export const useContainerStyles = makeStyles(() => ({
    wrapper: {
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
    },
}))
