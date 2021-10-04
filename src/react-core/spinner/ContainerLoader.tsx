import { FC } from 'react'
import { useBoxProps } from './hooks/spinner.styles'
import { Loader } from './Loader'

export interface IContainerLoaderSpinnerProps {
    height?: number,
    size?: number
}

export const ContainerLoader: FC<IContainerLoaderSpinnerProps> = ({ height, size = 48 }) => {
    const boxProps = useBoxProps({
        width: '100%',
        height: height ? `${height}px` : '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })
    return <Loader boxProps={boxProps} size={size} />
}
