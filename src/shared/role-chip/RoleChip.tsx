import React, {FC, memo} from 'react'
import {Chip} from '@material-ui/core'
import {useRoleChipClasses} from './role-chip.styles'
import clsx from 'clsx'
import {ERole, ROLES} from 'time-manager/auth/auth.constants'

interface IRoleChipProps {
    role: ERole
}

export const RoleChip: FC<IRoleChipProps> = memo(props => {
    const {
        role
    } = props

    const classes = useRoleChipClasses()
    console.log(role === ERole.ADMIN, role === ERole.CO_WORKER, role === ERole.VISITOR, 'role')
    return (
        <Chip
            className={clsx({
                [classes.admin]: role === ERole.ADMIN,
                [classes.coWorker]: role === ERole.CO_WORKER,
                [classes.visitor]: role === ERole.VISITOR
            })}
            label={ROLES[role]}
            color="secondary"
        />
    )
})
