import { createSelector } from 'reselect'
import { timeManagerRootSelector } from 'time-manager/redux/time-manager-main-selectors'

export const timeSheetsSelector = createSelector(
    timeManagerRootSelector,
    (timeSheets) =>
        timeSheets?.timeSheets?.list && timeSheets?.timeSheets?.list.length
            ? timeSheets?.timeSheets?.list
            : [{ title: 'no time sheets' }]
)

export const timeSheetSelector = createSelector(
    timeManagerRootSelector,
    (timeSheets) =>
        timeSheets?.timeSheets && timeSheets?.timeSheets?.currentTimeSheet
)
