import Box, { BoxProps } from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FC } from 'react'
import { IContainerLoaderSpinnerProps } from './ContainerLoader'

export interface ILoaderSpinner extends IContainerLoaderSpinnerProps {
    boxProps: BoxProps,
    size: number
}

export const Loader: FC<ILoaderSpinner> = ({ boxProps, size }) => {
    return (
        <Box {...boxProps}>
            <CircularProgress size={size} />
        </Box>
    )
}
