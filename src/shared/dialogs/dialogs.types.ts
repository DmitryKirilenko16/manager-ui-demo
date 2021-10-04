export interface ICurrentDialogPayload {
    type: string
    size: EDialogSizes
}

export enum EDialogSizes {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl'
}

export interface ICurrentDialog {
    type: string
    size: string
    meta?: any
}
