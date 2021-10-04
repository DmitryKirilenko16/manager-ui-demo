import React, { Fragment, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import createStyles from '@material-ui/core/styles/createStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import HomeIcon from '@material-ui/icons/Home'
import { useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { ISharedDynamicParams } from './models/router.models'
import { EXTRA_COLORS_PALETTE } from '../material.theme'
import {
    HttpMethods,
    IGenericRequestResponse,
} from '../react-core/fetch/fetch.types'
import { genericRequest } from '../react-core/fetch/fetch.call'
import { useSelector } from 'react-redux'
import {
    cachedUserSelector,
} from '../time-manager/dashboard/components/users/redux/users.selector'
import { customersSelector } from '../time-manager/dashboard/components/customers/redux/customers.selector'
import { ICustomer } from '../time-manager/dashboard/components/customers/customers.types'
import {
    cachedProjectSelector,
} from '../time-manager/dashboard/components/projects/redux/projects.selector'

interface IGenericPagePathProps {
  pageName?: string;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '24px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        title: {
            color: EXTRA_COLORS_PALETTE.WHITE,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            margin: '0 15px',
        },
        item: {
            color: EXTRA_COLORS_PALETTE.WHITE,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            margin: '0 15px',
            position: 'relative',
            whiteSpace: 'nowrap',
            '&::after': {
                content: '"/"',
                color: 'inherit',
                position: 'absolute',
                right: -18,
                pointerEvents: 'none',
            },
            '&:hover': {
                color: theme.palette.secondary.main,
                textDecoration: 'underline',
            },
            '&:last-child': {
                color: EXTRA_COLORS_PALETTE.WHITE,
                pointerEvents: 'none',
                '&::after': {
                    display: 'none',
                },
            },
        },
        icon: {
            width: 14,
            height: 14,
            marginRight: 8,
        },
    })
)

export enum ETimeManagerRouteParts {
  USERS = 'users',
  CUSTOMERS = 'customers',
  PROJECTS = 'projects',
}

const GenericPagePath: React.FunctionComponent<IGenericPagePathProps> = ({
    pageName,
}) => {
    const [name, setName] = useState('')
    const { pathname: location } = useLocation()
    const {
        params: { id },
    } = useRouteMatch<ISharedDynamicParams>()
    const locationItems = location.split('/').filter(Boolean)
    const [, currentRoute] = locationItems
    const classes = useStyles()
    const NAME_MAX_LENGTH = 30
    const customers = useSelector(customersSelector)

    const currentUser = useSelector(cachedUserSelector)
    const currentProject = useSelector(cachedProjectSelector)

    const pathItems = useMemo(() => {
        const pathItems: (string | React.ReactElement)[] = locationItems.map(
            (pathElement) => {
                if (pathElement === id) {
                    return name
                }

                if (
                    [ETimeManagerRouteParts.USERS].includes(
            pathElement as ETimeManagerRouteParts
                    )
                ) {
                    return pathElement
                }

                return pathElement.charAt(0).toUpperCase() + pathElement.slice(1)
            }
        )

        pathItems.splice(
            0,
            1,
            <>
                <HomeIcon className={classes.icon} />
                {pathItems[0]}
            </>
        )

        if (pageName) pathItems.splice(pathItems.length - 1, 1, pageName)

        return pathItems
    }, [pageName, locationItems, classes, id, name])

    const nameRequest = useCallback(
        (
            endpoint: string,
            onSuccess: (res: IGenericRequestResponse<any>) => void
        ) => {
            //TODO
            genericRequest(`/api${endpoint}/${id}`, HttpMethods.GET).then(onSuccess)
        },
        [id]
    )

    const getName = useCallback(
        (name: string) =>
            name?.length < NAME_MAX_LENGTH
                ? name
                : name?.slice(0, NAME_MAX_LENGTH - 2) + '...',
        []
    )

    useEffect(() => {
        if (location.includes(ETimeManagerRouteParts.USERS)) {
            const name = `${currentUser?.firstName} ${currentUser?.lastName}`
            if (currentUser) {
                setName(getName(name))
            }
        }

        if (location.includes(ETimeManagerRouteParts.CUSTOMERS)) {
            const currentCustomer = customers?.find(
                (customer: ICustomer) => customer?.id === Number(id)
            )
            const name = currentCustomer?.name

            if (currentCustomer) {
                setName(getName(name || ''))
            }
        }

        if (location.includes(ETimeManagerRouteParts.PROJECTS)) {
            if (currentProject) {
                setName(getName(currentProject?.name))
            }
        }
    }, [currentRoute, id, location, nameRequest, getName, customers, currentProject, currentUser])

    return (
        <div className={classes.wrapper}>
            <span className={classes.title}>You are in</span>
            <div className={classes.wrapper}>
                {pathItems.map((r, idx) => {
                    return (
                        <Fragment key={idx}>
                            <Link
                                to={`/${locationItems.slice(0, idx + 1).join('/')}`}
                                className={classes.item}
                            >
                                {r}
                            </Link>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default GenericPagePath
