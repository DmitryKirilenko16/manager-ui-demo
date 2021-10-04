export const TOKEN_KEY = 'token-key'

export const TIME_MANAGER_BASIC_VALIDATIONS = {
    minLength: 4,
    maxLength: 30,
    textFieldMaxLength: 255,
    minRate: 1,
    maxRate: 1000000,
    maxHours: 24,
    minHours: 1
}

export enum ERole {
    ADMIN = 1,
    CO_WORKER = 2,
    VISITOR = 3
}

export const ROLES = {
    [ERole.ADMIN]: 'Admin',
    [ERole.CO_WORKER]: 'Co-worker',
    [ERole.VISITOR]: 'Visitor'
}
