import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import React, {RefObject, useEffect, useState} from 'react'
import {useTableStyles} from './generic-table.styles'
import {IColumn} from './table.types'
import {useHistory} from 'react-router'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {usePaginationStyles} from './table-paginator.styles'
import {useDispatch} from 'react-redux'
import {TIME_MANAGER_PATH} from '../../main.container.routes'
import {PROFILE_PATH} from '../../time-manager/dashboard/time-manager-dashboard-routes'
import {setCurrentDialog} from '../dialogs/redux/dialogs.actions'
import {USER_PROJECTS_DIALOG} from '../dialogs/dialogs.constants'
import {EDialogSizes} from '../dialogs/dialogs.types'
import {ERole} from '../../time-manager/auth/auth.constants'

interface IPageButton {
    currentPage: number;
    page: number;
    onClick: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => any;
}

const PageButton: React.FC<IPageButton> = ({currentPage, page, onClick}) => {
    const classes = usePaginationStyles()
    return (
        <Button
            className={clsx(classes.button, {active: page === currentPage})}
            onClick={(e) => onClick(e, page)}
        >
            {page + 1}
        </Button>
    )
}

interface ITablePaginationProps {
    currentPage: number;
    itemsCount: number;
    rowsPerPage: number;
    onChangePage: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => any;
    className?: string;
}

const TablePagination: React.FC<ITablePaginationProps> = (props) => {
    const {itemsCount, currentPage, rowsPerPage, onChangePage, className} =
        props

    const classes = usePaginationStyles()
    const pagesCount = Math.ceil(itemsCount / rowsPerPage)
    // Virtual page cursor, NOT the current page,
    // uses just to check should we show 'more' button or not and where should it be (left or right side)
    // It can`t be less than 2 and more than pagesCount - 3
    const [cursor, setCursor] = useState(0)

    useEffect(() => {
        if (currentPage < 2) setCursor(2)
        else if (currentPage > pagesCount - 3) {
            setCursor(pagesCount - 3)
        } else {
            setCursor(currentPage)
        }
        // Should be called ONLY on currentPage changing
        // eslint-disable-next-line
    }, [currentPage])

    const cursorRight = () => {
        setCursor((state) => state + 1)
    }

    const cursorLeft = () => {
        setCursor((state) => state - 1)
    }

    const pagesRender = () => {
        // If quantity of pages <= 5, we show all of them
        if (pagesCount <= 5) {
            return [...Array(pagesCount)].map((_, index) => (
                <PageButton
                    currentPage={currentPage}
                    page={index}
                    onClick={onChangePage}
                    key={index}
                />
            ))
            // If cursor < 3, mean that we have no more than 2 pages on the left side so we show all of them without 'more' button on the left side
        } else if (cursor < 3) {
            return (
                <>
                    {[...Array(4)].map((_, index) => (
                        <PageButton
                            currentPage={currentPage}
                            page={index}
                            onClick={onChangePage}
                            key={index}
                        />
                    ))}
                    <IconButton onClick={cursorRight} className={classes.iconButton}>
                        <MoreHorizIcon/>
                    </IconButton>
                </>
            )
            // If cursor > number of pages - 4, mean that we have no more than 2 pages on the right side so we show all of them without 'more' button on the left side
        } else if (cursor > pagesCount - 4) {
            return (
                <>
                    <IconButton onClick={cursorLeft} className={classes.iconButton}>
                        <MoreHorizIcon/>
                    </IconButton>
                    {[...Array(4)].map((_, index) => (
                        <PageButton
                            currentPage={currentPage}
                            page={index + cursor - 1}
                            onClick={onChangePage}
                            key={index + cursor - 1}
                        />
                    ))}
                </>
            )
            // If we have more than 2 pages on the left side and on the right side of cursor, we show both 'more' buttons
        }
        return (
            <>
                <IconButton onClick={cursorLeft} className={classes.iconButton}>
                    <MoreHorizIcon/>
                </IconButton>
                {[...Array(3)].map((_, index) => (
                    <PageButton
                        currentPage={currentPage}
                        page={index + cursor - 1}
                        onClick={onChangePage}
                        key={index + cursor - 1}
                    />
                ))}
                <IconButton onClick={cursorRight} className={classes.iconButton}>
                    <MoreHorizIcon/>
                </IconButton>
            </>
        )

    }

    return (
        <Box className={clsx(classes.paginationControls, className)}>
            <Typography className={classes.label}>
                showing&nbsp;
                {rowsPerPage * currentPage || (itemsCount > 0 ? 1 : 0)}-
                {itemsCount > rowsPerPage * (currentPage + 1)
                    ? rowsPerPage * (currentPage + 1)
                    : itemsCount}
                &nbsp; of&nbsp;
                {itemsCount}&nbsp; items
            </Typography>
            {pagesRender()}
        </Box>
    )
}

interface ITableProviderProps {
    columns: IColumn[];
    data: any[];
    itemKey: (item: any) => string | number;
    header?: string | JSX.Element;
    skeleton?: Boolean;
    pagination?: ITablePaginationProps | null;
    className?: string;
    tableClassName?: string;
    cellClassName?: string;
    cellInlineStyles?: object;
    routerLink?: string;
    height?: number;
    tableContentRef?: RefObject<HTMLTableSectionElement>;
    userProjects?: boolean;
    fromProfile?: boolean;
    id?: number
}

export const GenericTable: React.FC<ITableProviderProps> = ({
    columns,
    data,
    itemKey,
    header,
    skeleton,
    pagination,
    className,
    routerLink,
    tableContentRef,
    cellClassName,
    cellInlineStyles,
    tableClassName,
    userProjects,
    fromProfile,
    id,
}) => {
    const classes = useTableStyles()
    const history = useHistory()
    const profileId = 1 // fake
    const dispatch = useDispatch()
    const currentRole = ERole.VISITOR // fake

    const rowClick = (e: MouseEvent, item: any) => {
        if (userProjects && currentRole === ERole.ADMIN) {
            dispatch(
                setCurrentDialog(
                    {
                        type: USER_PROJECTS_DIALOG,
                        size: EDialogSizes.MD,
                    },
                    {
                        id,
                        creationStep: false,
                        currentProject: item,
                        fromProfile,
                    },
                ),
            )
        }
        if (!routerLink) return

        //TODO
        header === 'Users' && item?.id === profileId
            ? history.push(`${TIME_MANAGER_PATH}${PROFILE_PATH}`)
            : history.push(`${routerLink}/${item.id}`)
    }

    return (
        <Paper className={clsx(classes.paper, className)}>
            <TableContainer className={classes.tableContainer} ref={tableContentRef}>
                {!!header && <Box className={classes.header}>{header}</Box>}
                <Table className={tableClassName} size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(({name, className}, index) => (
                                <TableCell
                                    style={cellInlineStyles}
                                    key={index}
                                    className={clsx(classes.headCell, className, cellClassName)}
                                >
                                    {name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.list}>
                        {skeleton
                            ? [...Array(data.length || pagination?.rowsPerPage || 5)].map(
                                (_, idx) => (
                                    <TableRow key={idx}>
                                        {[...Array(columns.length)].map((_, idx_) => (
                                            <TableCell
                                                style={cellInlineStyles}
                                                className={cellClassName}
                                                height={45}
                                                key={idx_}
                                            >
                                                <div
                                                    className="skeleton-style"
                                                    style={{
                                                        width: '100%',
                                                        height: '70%',
                                                    }}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ),
                            )
                            : data.map((item, idx) => (
                                <TableRow
                                    style={{cursor: routerLink ? 'pointer' : 'auto'}}
                                    onClick={(e) => rowClick(e as any, item)}
                                    key={itemKey(item)}
                                    className={clsx(classes.row)}
                                >
                                    {columns.map(({path, className}, index) => (
                                        <TableCell
                                            key={index}
                                            style={cellInlineStyles}
                                            className={clsx(
                                                classes.cell,
                                                className,
                                                {
                                                    [classes.lastCell]:
                                                    !pagination && idx === data.length - 1,
                                                },
                                                cellClassName,
                                            )}
                                        >
                                            {path ? path(item, index) : ''}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!!pagination && <TablePagination {...pagination} />}
        </Paper>
    )
}
