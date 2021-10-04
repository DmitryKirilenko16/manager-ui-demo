import {TIME_SHEETS_INITIAL_STATE} from './time-sheets.constants'

export type TimeSheetsState = typeof TIME_SHEETS_INITIAL_STATE

export interface ITimeSheet {
    hours?: number;
    taskDescription?: string;
    date?: string;
    projectId?: number;
    id?: number
    project_id?: number;
}
