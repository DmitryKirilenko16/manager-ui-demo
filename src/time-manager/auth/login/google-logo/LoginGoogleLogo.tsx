import * as React from 'react'
import GoogleLogo from 'assets/img/shared/google-logo.svg'
import { Icon } from '@material-ui/core'

export const LoginGoogleLogo: React.FC = () => {
    return (
        <Icon>
            <img src={GoogleLogo} alt="google logo" />
        </Icon>
    )
}
