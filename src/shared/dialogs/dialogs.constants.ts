export const CONFIRMATION_DIALOG = 'CONFIRMATION_DIALOG' as const

export const TIME_SHEET_DIALOG = 'TIME_SHEET_DIALOG' as const

export const GENERIC_DIALOG = 'GENERIC_DIALOG' as const

export const USER_PROJECTS_DIALOG = 'USER_PROJECTS_DIALOG' as const

export type DialogType =
  | typeof CONFIRMATION_DIALOG
  | typeof GENERIC_DIALOG
  | typeof TIME_SHEET_DIALOG
  | typeof USER_PROJECTS_DIALOG
