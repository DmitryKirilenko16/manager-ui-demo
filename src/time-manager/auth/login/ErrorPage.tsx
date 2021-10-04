import React from 'react'
import {Box, makeStyles} from '@material-ui/core'
import {EXTRA_COLORS_PALETTE} from '../../../material.theme'

export const ErrorPage: React.FC = () => {
    const useClasses = makeStyles(() => ({
        test: {
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mailTo: {
            color: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
        },
    }))
    const classes = useClasses()
    return (
        <Box className={classes.test}>
            <h1 style={{color: 'white'}}>
                Some message
            </h1>
            <div>
                <a href="mailto:SECRET@gmail.com" className={classes.mailTo}>
                    Сontact us by mail
                </a>
            </div>
        </Box>
    )
}
