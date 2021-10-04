import React, {useCallback, useEffect, useMemo} from 'react'
import {ContainerCardTable, ICardTableData} from 'shared/card-table/ContainerCardTable'
import {useCardTableStyles} from 'shared/card-table/card-table.styles'
import {GenericInput} from 'shared/GenericInput'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserProjects, getUser, updateUser} from 'time-manager/dashboard/components/users/users.utils'
import {useRouteMatch} from 'react-router-dom'
import {ISharedDynamicParams} from 'shared/models/router.models'
import {cachedUserSelector, userProjectsSelector} from 'time-manager/dashboard/components/users/redux/users.selector'
import {EEmployeeStatus, IUser, IUserProject} from 'time-manager/dashboard/components/users/users.types'
import {TIME_MANAGER_BASIC_VALIDATIONS, TOKEN_KEY} from 'time-manager/auth/auth.constants'
import {EWhoseDetails} from 'shared/card-table/CardTable'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {profileRoleSelector} from 'react-core/profile/redux/profile.selectors'
import {ERole} from 'react-core/profile/profile.types'
import {DropdownSelector} from 'shared/dropdown-selector/DropdownSelector'
import {useDialogStyles} from 'shared/dialogs/dialog.styles'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import {setCurrentDialog} from 'shared/dialogs/redux/dialogs.actions'
import {USER_PROJECTS_DIALOG} from 'shared/dialogs/dialogs.constants'
import {EDialogSizes} from 'shared/dialogs/dialogs.types'
import {GenericTable} from 'shared/table/GenericTable'
import {projectsSelector} from 'time-manager/dashboard/components/projects/redux/projects.selector'
import {fetchProjectsList} from 'time-manager/dashboard/components/projects/projects.utils'
import {useUsersDetailsStyles} from '../user-detail.styles'
import {IOption} from 'shared/models/options.models'
import {IProject} from '../../../../projects/projects.types'
import {RoleChip} from 'shared/role-chip/RoleChip'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import {ECastableTypes, ValidateRequestBodyUtils} from 'react-core/utils/api/validate-request-body/validate-request-body.util'

export interface IUsersDetailsCardProps {
}

export const ROLES_OPTIONS: IOption[] = [
    {value: ERole.CO_WORKER, label: 'Co-worker'},
    {value: ERole.VISITOR, label: 'Visitor'},
]

export const EMPLOYEE_STATUSES_OPTIONS: IOption[] = [
    {value: EEmployeeStatus.PRIVATE_ENTREPRENEUR, label: 'Private entrepreneur'},
    {value: EEmployeeStatus.TRAINEE, label: 'Trainee'},
]

export const UsersDetailsCard: React.FC<IUsersDetailsCardProps> = () => {
    const cardTableClasses = useCardTableStyles()
    const usersClasses = useUsersDetailsStyles()
    const dispatch = useDispatch()
    const {
        params: {id},
    } = useRouteMatch<ISharedDynamicParams>()
    const user = useSelector(cachedUserSelector)
    const token = localStorage.getItem(TOKEN_KEY)
    const userProjects = useSelector(userProjectsSelector)
    const projects = useSelector(projectsSelector)
    const currentRole = useSelector(profileRoleSelector)

    useEffect(() => {
        if (id && currentRole === ERole.ADMIN) {
            dispatch(fetchUserProjects(+id!))
        }

        dispatch(fetchProjectsList())
    }, [dispatch, id, currentRole])

    const handleUpdateUser = (values: IUser) => {
        dispatch(updateUser(+id!, values))
    }

    const userProjectsColumns = useMemo(
        () => [
            {
                name: 'Title',
                path: (item: IUserProject) =>
                    projects?.find((project: IProject) => project?.id === item?.projectId)
                        ?.name,
            },
            {
                name: 'Rate',
                path: (item: IUserProject) => item?.ratePerHour,
            },
        ],
        [projects],
    )

    const dialogClasses = useDialogStyles()

    const userFormik = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            phoneNumber: user?.phoneNumber || '',
            position: user?.position || '',
            role: user?.role || '',
            ratePerHour: user?.ratePerHour || '',
            ratePerMonth: user?.ratePerMonth || '',
            employeeStatus: user?.employeeStatus || '',
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string()
                .required('This field is required')
                .min(TIME_MANAGER_BASIC_VALIDATIONS.minLength, 'Too short')
                .max(TIME_MANAGER_BASIC_VALIDATIONS.maxLength, 'Too long')
                .required('Required'),
            lastName: Yup.string()
                .required('This field is required')
                .min(TIME_MANAGER_BASIC_VALIDATIONS.minLength, 'Too short')
                .max(TIME_MANAGER_BASIC_VALIDATIONS.maxLength, 'Too long')
                .required('Required'),
            phoneNumber: Yup.string()
                .required('Required')
                .max(12, 'Should be less than 13')
                .required('Required'),
            position: Yup.string()
                .min(TIME_MANAGER_BASIC_VALIDATIONS.minLength, 'Too short')
                .max(TIME_MANAGER_BASIC_VALIDATIONS.maxLength, 'Too long'),
            role: Yup.number().required('Required'),
            ratePerHour: Yup.number()
                .min(TIME_MANAGER_BASIC_VALIDATIONS.minRate)
                .max(TIME_MANAGER_BASIC_VALIDATIONS.maxRate),
            ratePerMonth: Yup.number()
                .min(TIME_MANAGER_BASIC_VALIDATIONS.minRate)
                .max(TIME_MANAGER_BASIC_VALIDATIONS.maxRate),
            employeeStatus: Yup.number(),
        }),
        enableReinitialize: true,
        validateOnMount: false,
        onSubmit: (values) => {
            const body = ValidateRequestBodyUtils.validateBody<IUser>(
                values as IUser,
                [
                    {
                        propName: 'ratePerMonth',
                        cast: ECastableTypes.NUMBER
                    },
                    {
                        propName: 'ratePerHour',
                        cast: ECastableTypes.NUMBER
                    }
                ]
            )

            body && handleUpdateUser(body)
        },
    })

    const cardData: ICardTableData[] = useMemo(
        () => {
            const basicCells = [
                {
                    title: 'First name',
                    description: user?.firstName,
                },
                {
                    title: 'Last name',
                    description: user?.lastName,
                },
                {
                    title: 'Phone number',
                    description: user?.phoneNumber || '-',
                },
                {
                    title: 'Email',
                    description: user?.email,
                },
                {
                    title: 'Position',
                    description: user?.position || '-',
                },
                {
                    title: 'Role',
                    description: user?.role ? <RoleChip role={user.role}/> : '-',
                },
            ]

            if (currentRole !== ERole.ADMIN) {
                return basicCells
            }

            const adminCells = [
                {
                    title: 'Rate per hour',
                    description: user?.ratePerHour ? user?.ratePerHour + '$' : '-',
                },
                {
                    title: 'Salary',
                    description: user?.ratePerMonth ? user?.ratePerMonth + '$' : '-',
                },
            ]

            return [...basicCells, ...adminCells]
        },
        [user, currentRole],
    )

    useEffect(() => {
        dispatch(getUser(+id!))
    }, [token, id, dispatch])

    const getProfileForm = useCallback(
        (): JSX.Element => {
            return (
                <form className={cardTableClasses.form}>
                    <div className={'formFieldWrap'}>
                        <GenericInput
                            variant="outlined"
                            name="firstName"
                            label="First name"
                            value={userFormik.values.firstName}
                            onChange={userFormik.handleChange}
                            error={userFormik.touched.firstName && !!userFormik.errors.firstName}
                            helperText={userFormik.touched.firstName && userFormik.errors.firstName}
                            onBlur={userFormik.handleBlur}
                        />
                    </div>

                    <div className={'formFieldWrap'}>
                        <GenericInput
                            variant="outlined"
                            name="lastName"
                            label="Last name"
                            value={userFormik.values.lastName}
                            onChange={userFormik.handleChange}
                            error={userFormik.touched.lastName && !!userFormik.errors.lastName}
                            helperText={userFormik.touched.lastName && userFormik.errors.lastName}
                            onBlur={userFormik.handleBlur}
                        />
                    </div>

                    <div className={'formFieldWrap'}>
                        <GenericInput
                            variant="outlined"
                            name="phoneNumber"
                            label="Phone number"
                            value={userFormik.values.phoneNumber}
                            onChange={userFormik.handleChange}
                            error={userFormik.touched.phoneNumber && !!userFormik.errors.phoneNumber}
                            helperText={userFormik.touched.phoneNumber && userFormik.errors.phoneNumber}
                            onBlur={userFormik.handleBlur}
                        />
                    </div>

                    <div className={'formFieldWrap'}>
                        <GenericInput
                            variant="outlined"
                            name="position"
                            label="Position"
                            value={userFormik.values.position}
                            onChange={userFormik.handleChange}
                            error={userFormik.touched.position && !!userFormik.errors.position}
                            helperText={userFormik.touched.position && userFormik.errors.position}
                            onBlur={userFormik.handleBlur}
                        />
                    </div>


                    <div className={'formFieldWrap'}>
                        <GenericInput
                            variant="outlined"
                            name="ratePerHour"
                            label="Rate per hour"
                            value={userFormik.values.ratePerHour}
                            onChange={userFormik.handleChange}
                            error={userFormik.touched.ratePerHour && !!userFormik.errors.ratePerHour}
                            helperText={userFormik.touched.ratePerHour && userFormik.errors.ratePerHour}
                            onBlur={userFormik.handleBlur}
                            InputProps={{
                                endAdornment: (
                                    <AttachMoneyIcon className={'inputIcon'}/>
                                ),
                            }}
                        />
                    </div>

                    <div className={'formFieldWrap'}>
                        <GenericInput
                            variant="outlined"
                            name="ratePerMonth"
                            label="Salary"
                            value={userFormik.values.ratePerMonth}
                            onChange={userFormik.handleChange}
                            error={userFormik.touched.ratePerMonth && !!userFormik.errors.ratePerMonth}
                            helperText={userFormik.touched.ratePerMonth && userFormik.errors.ratePerMonth}
                            onBlur={userFormik.handleBlur}
                            InputProps={{
                                endAdornment: (
                                    <AttachMoneyIcon className={'inputIcon'}/>
                                ),
                            }}
                        />
                    </div>

                    <div className={'formFieldWrap'}>
                        <DropdownSelector
                            name={'employeeStatus'}
                            options={EMPLOYEE_STATUSES_OPTIONS}
                            value={userFormik.values?.employeeStatus || ''}
                            onChange={userFormik.handleChange}
                            label={'Employee status'}
                            extraClasses={dialogClasses}
                        />
                    </div>

                    <div className={'formFieldWrap'}>
                        <DropdownSelector
                            options={ROLES_OPTIONS}
                            value={userFormik.values?.role || ''}
                            onChange={userFormik.handleChange}
                            label={'Role'}
                            extraClasses={dialogClasses}
                            name={'role'}
                        />
                    </div>
                </form>
            )
        },
        [cardTableClasses.form, dialogClasses, userFormik.errors.firstName, userFormik.errors.lastName, userFormik.errors.phoneNumber, userFormik.errors.position, userFormik.errors.ratePerHour, userFormik.errors.ratePerMonth, userFormik.handleBlur, userFormik.handleChange, userFormik.touched.firstName, userFormik.touched.lastName, userFormik.touched.phoneNumber, userFormik.touched.position, userFormik.touched.ratePerHour, userFormik.touched.ratePerMonth, userFormik.values?.employeeStatus, userFormik.values.firstName, userFormik.values.lastName, userFormik.values.phoneNumber, userFormik.values.position, userFormik.values.ratePerHour, userFormik.values.ratePerMonth, userFormik.values?.role],
    )

    return (
        <>
            <ContainerCardTable
                disabled={!userFormik.isValid}
                whoseDetails={EWhoseDetails.USER}
                cardData={cardData}
                form={getProfileForm()}
                formikSubmitHandler={userFormik.handleSubmit}
                usersBgc={true}
            />

            {currentRole === ERole.ADMIN && (
                <GenericTable
                    data={userProjects || []}
                    columns={userProjectsColumns}
                    itemKey={(p: any) => p.id}
                    userProjects
                    id={+id!}
                    header={
                        <div className={usersClasses.personalProjectsHeader}>
                            <span>Personal projects</span>{' '}
                            <Button
                                className={clsx(cardTableClasses.actionButton)}
                                startIcon={<AddIcon/>}
                                onClick={() =>
                                    dispatch(
                                        setCurrentDialog(
                                            {
                                                type: USER_PROJECTS_DIALOG,
                                                size: EDialogSizes.MD,
                                            },
                                            {
                                                creationStep: true,
                                                fromProfile: false,
                                                id: +id!,
                                            },
                                        ),
                                    )
                                }
                            >
                                Create project
                            </Button>
                        </div>
                    }
                />
            )}
        </>
    )
}
