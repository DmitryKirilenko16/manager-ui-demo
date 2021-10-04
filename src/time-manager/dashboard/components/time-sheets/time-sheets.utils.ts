import {
    TIME_SHEET_CREATE_ACTION_REQUEST_ID,
    TIME_SHEET_DELETE_ACTION_REQUEST_ID,
    TIME_SHEET_FETCH_ACTION_REQUEST_ID,
    TIME_SHEET_UPDATE_ACTION_REQUEST_ID,
    timeSheetCreateAction,
    timeSheetDeleteAction,
    timeSheetsFetchAction,
    timeSheetUpdateAction,
} from './redux/time-sheets.actions'
import { ITimeSheet } from './time-sheets.types'

export const fetchTimeSheetsList = (id: number) => {
    return timeSheetsFetchAction.build(
        null,
        TIME_SHEET_FETCH_ACTION_REQUEST_ID,
        {},
        {},
        { userId: id }
    )
}

export const createTimeSheet = (body: any, id: any) => {
    return timeSheetCreateAction.build(
        {
            ...body,
            hours: +body?.hours,
        },
        TIME_SHEET_CREATE_ACTION_REQUEST_ID,
        {},
        {},
        {},
        {id}
    )
}

export const updateTimeSheet = (body: any, timeSheetId: number, id: number) => {
    return timeSheetUpdateAction.build(
        {
            taskDescription: body?.taskDescription,
            hours: +body.hours,
        },
        TIME_SHEET_UPDATE_ACTION_REQUEST_ID,
        {},
        {id: timeSheetId},
        {},
        {id}
    )
}

export const deleteTimeSheet = (id: any, profileId: number) => {
    return timeSheetDeleteAction.build(
        { id, profileId },
        TIME_SHEET_DELETE_ACTION_REQUEST_ID,
        {},
        { id }
    )
}

export const updateTimeSheetData = (id: number, body: ITimeSheet | any) => {
    return timeSheetUpdateAction.build(
        JSON.stringify({
            ...body,
            hours: +body?.hours,
        }),
        TIME_SHEET_UPDATE_ACTION_REQUEST_ID,
        {},
        { id }
    )
}
