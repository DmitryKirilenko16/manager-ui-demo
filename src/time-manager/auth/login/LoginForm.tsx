import React from 'react'
import {LoginMainLogo} from './main-logo/LoginMainLogo'
import {Box, Button} from '@material-ui/core'
import {LoginGoogleLogo} from './google-logo/LoginGoogleLogo'
import {useAuthClasses} from '../auth.styles'

interface ILoginFormProps {
    handleSignIn: () => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({handleSignIn}) => {
    const authClasses = useAuthClasses()
    return (
        <Box className={authClasses.loginContainer}>
            <Box className={authClasses.authContainer}>
                <LoginMainLogo/>
                <Button
                    variant={'contained'}
                    className={authClasses.authButton}
                    startIcon={<LoginGoogleLogo/>}
                    onClick={() => handleSignIn()}
                >
                    Sign in
                </Button>
            </Box>
        </Box>
    )
}
