import * as React from 'react'
import { ReactComponent as MainLogo } from 'assets/img/shared/logo.svg'
import { useLoginMainLogoStyles } from './login-main-logo.styles'

export const LoginMainLogo: React.FC = () => {
    const logoClasses = useLoginMainLogoStyles()

    return <MainLogo className={logoClasses.mainLogo} />
}
