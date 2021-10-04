import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit'
import {useDashboardRouteStyles} from '../../dashboard-route.styles'
import {CustomAvatar} from 'shared/avatar/Avatar'
import {useDispatch} from 'react-redux'
import {useBackButtonStyles} from 'shared/styles/back-button.styles'
import {Button} from '@material-ui/core'
import {timeManagerLoggedOutAction} from 'redux/root.actions'
import {useEffect} from 'react'

export const SideMenuUserInfo: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({} /* fetchPerson() */)
    }, [dispatch])

    const classes = useDashboardRouteStyles()
    const backButtonClasses = useBackButtonStyles()
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    const userData = {} as any // fake

    const handleLogout = () => {
        dispatch(timeManagerLoggedOutAction())
    }

    return (
        <div className={classes.shortUsersInfo}>
            {/* AVATAR */}
            <CustomAvatar className={'avatar'} avatarSrc={'fake'}/>

            {/* USER GREETINGS */}
            <Typography className="name" style={{color: 'white'}}>
                {userData ? userData.firstName : '-'}
            </Typography>

            {/* DATE INFOS */}
            <Typography className={classes.date} variant={'body2'}>
                {date}
            </Typography>

            <div className="actions">
                <Button
                    onClick={() => handleLogout()}
                    className={backButtonClasses.backButton}
                    startIcon={<TransitEnterexitIcon/>}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}
