import React, {FC, memo} from 'react'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {useBackButtonStyles} from 'shared/styles/back-button.styles'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {useUsersDetailsStyles} from '../user-detail.styles'
import GenericPagePath from 'shared/GenericPagePath'
import {ERole} from 'react-core/profile/profile.types'
import GenericButton from 'shared/GenericButton'
import {useSelector} from 'react-redux'
import {profileRoleSelector} from 'react-core/profile/redux/profile.selectors'
import {AccessTime} from '@material-ui/icons'
import {TIME_MANAGER_PATH} from 'main.container.routes'
import {TIME_SHEETS_PATH} from 'time-manager/dashboard/time-manager-dashboard-routes'
import {ISharedDynamicParams} from 'shared/models/router.models'

interface UsersDetailsHeaderProps {
    deleteUserI18nKey?: string;
    updateUserStatusI18nKey?: string;
    handleSendConfirmEmail?: () => void;
    disabled?: boolean;
}

export const UsersDetailsHeader: FC<UsersDetailsHeaderProps> = memo(() => {
    const backButtonClasses = useBackButtonStyles()
    const history = useHistory()
    const usersDetailsClasses = useUsersDetailsStyles()
    const currentRole = useSelector(profileRoleSelector)
    const {
        params: {id},
    } = useRouteMatch<ISharedDynamicParams>()

    const toUserTimeSheet = () => {
        history.push(`${TIME_MANAGER_PATH}${TIME_SHEETS_PATH}/?userId=${id}`)
    }

    return (
        <>
            <div className={usersDetailsClasses.userDetailsHeader}>
                <div className="part">
                    <Button
                        className={backButtonClasses.backButton}
                        startIcon={<ArrowBackIosIcon/>}
                        onClick={() => history.goBack()}
                    >
                        Back
                    </Button>
                    <GenericPagePath/>
                </div>

                {currentRole === ERole.ADMIN && (
                    <div className="part">
                        <GenericButton onClick={toUserTimeSheet} variant="contained">
                            <AccessTime className="mr-1" style={{marginRight: 10}}/>
                            Show time sheet
                        </GenericButton>
                    </div>
                )}
            </div>
        </>
    )
})
