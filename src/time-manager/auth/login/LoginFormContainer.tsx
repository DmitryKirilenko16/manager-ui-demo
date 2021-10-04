import React from 'react'
import { LoginForm } from './LoginForm'
import {
    GOOGLE_ENDPOINT,
} from '../../redux/time-manager.api.constants'
import {SERVER_BASE_URL} from '../../../react-core/fetch/fetch.api'

export const LoginFormContainer: React.FC = () => {
    const handleSignIn = () => {
        window.open(`${SERVER_BASE_URL}${GOOGLE_ENDPOINT}`)
    }

    return (
        <>
            <LoginForm handleSignIn={handleSignIn} />
        </>
    )
}
