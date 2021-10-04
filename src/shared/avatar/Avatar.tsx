import {FC} from 'react'
import Avatar from '@material-ui/core/Avatar'

interface IAvatarProps {
    className?: string
    name?: string,
    avatarSrc: string
}


export const CustomAvatar: FC<IAvatarProps> = props => {
    const {className, avatarSrc} = props

    return (
        <Avatar src={avatarSrc}
            className={className}
        >
        </Avatar>
    )
}
