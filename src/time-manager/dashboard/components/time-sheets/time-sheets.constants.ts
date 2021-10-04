import {ITimeSheet} from './time-sheets.types'

export const TIME_SHEETS_INITIAL_STATE = {
    list: null as null | any,
    currentTimeSheet: null as null | ITimeSheet
}

export const TIME_SHEET_CREATION_SUCCESS = 'Time sheet log was created'
export const TIME_SHEET_UPDATING_SUCCESS = 'Time sheet log was updated'
export const TIME_SHEET_DELETING_SUCCESS = 'Time sheet log was deleted'

export const TIME_SHEETS_HOURS_ERROR = 'One day cannot be more than 24 hours'
export const TIME_SHEETS_HOURS_WARNING = 'Cannot be more than 24h'

export const ONE_DAY_MAX_HOURS = 24

export const TIME_SHEETS_TITLE_ERROR = 'Your rate is not defined. Let your admin know'



