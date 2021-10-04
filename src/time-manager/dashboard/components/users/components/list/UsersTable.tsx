import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import {GenericTable} from 'shared/table/GenericTable'
import {useDispatch, useSelector} from 'react-redux'
import {totalUsersSelector, usersSelector} from '../../redux/users.selector'
import {IUser} from '../../users.types'
import {TIME_MANAGER_PATH} from '../../../../../../main.container.routes'
import {USERS_PATH} from '../../../../time-manager-dashboard-routes'
import {USERS_PAGINATION} from '../../redux/users.constants'
import {fetchUsersList} from '../../users.utils'
import {TOKEN_KEY} from '../../../../../auth/auth.constants'
import {loggedInUserSelector} from 'react-core/profile/redux/profile.selectors'
import {EMPLOYEE_STATUSES, ERole} from 'react-core/profile/profile.types'
import {Chip} from '@material-ui/core'
import {RoleChip} from 'shared/role-chip/RoleChip'

interface IUsersTableProps {
    withPagination?: boolean;
}

export const UsersTable: React.FC<IUsersTableProps> = ({withPagination}) => {
    const listRef = useRef<HTMLTableSectionElement>(null)
    const users = useSelector(usersSelector)
    const totalUsers = useSelector(totalUsersSelector)
    const loggedInUser = useSelector(loggedInUserSelector)
    const [usersPage, setUsersPage] = useState(0)
    const dispatch = useDispatch()
    const isLoggedInUserAdmin: boolean = loggedInUser?.role === ERole.ADMIN

    const userColumns = useMemo(
        () => {
            const baseTableData = [
                {
                    name: 'Name',
                    path: (item: IUser) => item.firstName + ' ' + item.lastName,
                },
                {
                    name: 'Position',
                    path: (item: IUser) => item.position || '-',
                },
                {
                    name: 'Role',
                    path: (item: IUser) => (
                        <RoleChip role={item.role}/>
                    ),
                },
                {
                    name: 'Type',
                    path: (item: IUser) => item.employeeStatus ?
                        <Chip label={EMPLOYEE_STATUSES[item.employeeStatus]} color="primary"/> : '-',
                },
            ]

            if (!isLoggedInUserAdmin) return baseTableData

            const adminOnlyCells = [
                {
                    name: 'Rate per hour',
                    path: (item: IUser) => item.ratePerHour ? <Chip label={item.ratePerHour + '$'} color="primary"/> : '-',
                },
                {
                    name: 'Salary',
                    path: (item: IUser) => item.ratePerMonth ? <Chip label={item.ratePerMonth + '$'} color="primary"/> : '-',
                },
            ]

            return [
                ...baseTableData,
                ...adminOnlyCells,
            ]
        },
        [isLoggedInUserAdmin],
    )

    const token = localStorage.getItem(TOKEN_KEY)

    const dispatchFetchUsersList = useCallback(
        (take?: number, skip?: number) =>
            dispatch(fetchUsersList(take, skip)),
        [dispatch],
    )

    useEffect(() => {
        dispatchFetchUsersList()
    }, [token, dispatchFetchUsersList, dispatch])

    return (
        <GenericTable
            header={'Users'}
            tableContentRef={listRef}
            data={users || []}
            itemKey={(item) => item.id}
            columns={userColumns || []}
            routerLink={`${TIME_MANAGER_PATH}${USERS_PATH}`}
            // TODO
            pagination={
                withPagination
                    ? {
                        currentPage: usersPage,
                        itemsCount: totalUsers,
                        rowsPerPage: USERS_PAGINATION.pageSize,
                        onChangePage: (e, p) => {
                            setUsersPage(p)
                            dispatchFetchUsersList(USERS_PAGINATION.pageSize, USERS_PAGINATION.pageSize * p)
                        },
                    }
                    : null
            }
        />
    )
}
