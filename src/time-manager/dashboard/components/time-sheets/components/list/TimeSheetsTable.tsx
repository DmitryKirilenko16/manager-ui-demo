import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {timeSheetsSelector} from 'time-manager/dashboard/components/time-sheets/redux/time-sheets.selector'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'

import FullCalendar, {
    DateSelectArg,
    EventClickArg,
} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import clsx from 'clsx'
import {Paper, TableContainer} from '@material-ui/core'
import {useTableStyles} from 'shared/table/generic-table.styles'
import {setCurrentDialog} from 'shared/dialogs/redux/dialogs.actions'
import {TIME_SHEET_DIALOG} from 'shared/dialogs/dialogs.constants'
import {EDialogSizes} from 'shared/dialogs/dialogs.types'
import {setCurrentTimeSheet} from 'time-manager/dashboard/components/time-sheets/redux/time-sheets.actions'
import {IRootState} from 'react-core/core.types'
import {ITimeSheet} from 'time-manager/dashboard/components/time-sheets/time-sheets.types'
import {
    cachedUserSelector,
    userProjectsSelector,
} from 'time-manager/dashboard/components/users/redux/users.selector'
import {useLocation} from 'react-router'
import queryString from 'querystring'
import {fetchTimeSheetsList} from 'time-manager/dashboard/components/time-sheets/time-sheets.utils'
import {
    fetchUserProjects,
    getUser,
} from 'time-manager/dashboard/components/users/users.utils'
import {IUserProject} from 'time-manager/dashboard/components/users/users.types'
import {
    clearCashedUser,
    clearUserProjects,
} from 'time-manager/dashboard/components/users/redux/users.actions'
import {showWarning} from 'react-core/components/toast/GenericSnackbar'
import dayjs from 'dayjs'
import {timeSheetDateFormat} from 'shared/dayjs/dayjs.constants'
import {
    ONE_DAY_MAX_HOURS,
    TIME_SHEETS_HOURS_WARNING,
    TIME_SHEETS_TITLE_ERROR,
} from '../../time-sheets.constants'
import {ERole} from '../../../../../auth/auth.constants'

export const TimeSheetsTable: React.FC = () => {
    const timeSheets = useSelector(timeSheetsSelector)
    const classes = useTableStyles()
    const dispatch = useDispatch()
    const projects = useSelector(() => {
    }) // fake
    const profileRate = useSelector(() => {
    }) // fake
    const user = useSelector(cachedUserSelector)
    const defaultUserRate = user?.ratePerHour
    const currentDialog = useSelector(
        (store: IRootState) => store?.currentDialog,
    )
    const location = useLocation()
    const profile = useSelector(() => {
    }) // fake
    const profileId = 1 // fake
    const parsedParams = queryString.parse(location.search)
    const id = parsedParams['?userId']
    const userProjects = useSelector(userProjectsSelector)
    const profileProjects = useSelector(() => {
    }) // fake
    const [salary, setSalary] = useState<any>(0)
    const [name, setName] = useState('')
    const currentRole = ERole.VISITOR // fake

    useEffect(() => {
        profileId && dispatch(fetchTimeSheetsList(id ? +id! : +profileId!))
        if (id) {
            dispatch(getUser(+id!))
            dispatch(fetchUserProjects(+id!))
        }

        if (!id) {
            dispatch(clearUserProjects())
            dispatch(clearCashedUser())
        }
    }, [dispatch, profileId, id])

    useEffect(() => {
        if (userProjects && timeSheets && defaultUserRate && user && id) {
            const logsWithDefaultRate = timeSheets?.filter(
                (timeSheet: ITimeSheet) =>
                    timeSheet?.projectId !==
                    userProjects?.find(
                        (userProject: any) =>
                            userProject?.projectId === timeSheet?.projectId,
                    )?.projectId,
            )

            const count = timeSheets?.reduce(
                (sum: number, timeSheet: ITimeSheet | any) =>
                    sum +
                    timeSheet?.hours *
                    (userProjects?.find(
                        (project: IUserProject | any) =>
                            project?.projectId === timeSheet?.projectId,
                    )?.ratePerHour || defaultUserRate),
                0,
            )
            setSalary(() =>
                logsWithDefaultRate.length && !defaultUserRate ? defaultUserRate : count,
            )
            setName(() => `${user?.firstName} ${user?.lastName}`)
        }
    }, [userProjects, timeSheets, defaultUserRate, user, id])


    function getDaysArrayByMonth() {
        let daysInMonth = dayjs().daysInMonth()
        const arrDays = []

        while (daysInMonth) {
            const current = dayjs().date(daysInMonth).format(timeSheetDateFormat)
            arrDays.push(current)
            daysInMonth--
        }

        return arrDays
    }

    useEffect(() => {
        dispatch({} /* fetchProjectsList() */) // fake
    }, [dispatch])

    const initialEvents = timeSheets.map((sheet: any) => ({
        title: 'Initial title',
        id: sheet.id,
        start: sheet.date,
        //TODO rename textColor  or another method to set hours
        textColor: sheet?.hours,
    }))

    const renderEventContent = (eventInfo: any) => {
        return (
            <div className={classes.eventContentContainer}>
                <p style={{display: 'flex', flex: 1}}>{eventInfo?.event?.title}</p>
                <div className={classes.eventHours}>
                    <QueryBuilderIcon className={classes.eventsSvg}/>
                    <p style={{marginLeft: 5}}>{eventInfo?.event?.textColor}</p>
                </div>
            </div>
        )
    }

    const calculateTotalHours = (date: string) => {
        return timeSheets
            ?.filter((el: ITimeSheet) => el?.date === date)
            ?.reduce(
                (sum: number, timeSheet: ITimeSheet): number =>
                    timeSheet.hours ? sum + timeSheet?.hours : 0,
                0,
            )
    }

    const handleEventClick = (clickInfo: EventClickArg | any) => {
        const daysList = getDaysArrayByMonth()
        const eventId = clickInfo.event.id
        const date = clickInfo?.event?.startStr
        const timeSheet = timeSheets?.find((sheet: any) => +sheet?.id === +eventId)
        const totalHours = calculateTotalHours(date)
        const hideButtons = !daysList.includes(date)
        console.log(hideButtons)
        dispatch(setCurrentTimeSheet(timeSheet))
        dispatch(
            setCurrentDialog(
                {
                    type: TIME_SHEET_DIALOG,
                    size: EDialogSizes.MD,
                },
                {
                    projects: projects,
                    creationStep: false,
                    totalHours,
                    queryId: +id,
                    userProjects: id ? userProjects : profileProjects,
                    defaultRate: id ? +defaultUserRate! : +profileRate!,
                    hideButtons,
                },
            ),
        )
    }

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const daysList = getDaysArrayByMonth()
        const date = selectInfo.startStr

        // @ts-ignore // fake
        if (id && currentRole === ERole.ADMIN) {
            return
        }

        if (!daysList.includes(date)) {
            return
        }

        const totalHours = calculateTotalHours(date)

        if (totalHours < ONE_DAY_MAX_HOURS) {
            dispatch(
                setCurrentDialog(
                    {
                        type: TIME_SHEET_DIALOG,
                        size: EDialogSizes.MD,
                    },
                    {
                        date,
                        projects: projects,
                        creationStep: true,
                        totalHours,
                        queryId: +id,
                    },
                ),
            )
        } else {
            showWarning(TIME_SHEETS_HOURS_WARNING)
        }
    }

    return (
        <>
            <Paper className={clsx(classes.paper)}>
                <TableContainer
                    className={clsx({
                        [classes.tableContainer]: true,
                        [classes.paddings]: true,
                        [classes.test]: true,
                        [classes.popoverHidden]: currentDialog,
                    })}
                >
                    {/*todo*/}
                    <div className={classes.timeSheetTitle}>
                        Name: {name} <br/>
                        Salary: {salary ? `$ ${salary}` : TIME_SHEETS_TITLE_ERROR}
                    </div>
                    <FullCalendar
                        height={'95%'}
                        weekNumberClassNames={classes.weekends}
                        dayCellClassNames={classes.weekends}
                        fixedWeekCount={false}
                        handleWindowResize={true}
                        allDayClassNames={classes.weekends}
                        viewClassNames={clsx({
                            [classes.test]: true,
                            [classes.paddings]: true,
                        })}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next',
                            center: 'title',
                            right: 'today',
                        }}
                        showNonCurrentDates={false}
                        weekends={true}
                        editable={true}
                        dayMaxEvents={true}
                        selectable={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        events={initialEvents}
                        eventContent={renderEventContent}
                    />
                </TableContainer>
            </Paper>
        </>
    )
}
