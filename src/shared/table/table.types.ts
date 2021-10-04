export interface IColumn {
    name: JSX.Element | string | number
    path?: (item: any, index: number) => any
    className?: string
}

export interface ICampaignsPaginator {
    currentPage: number
    itemsCount: number
    rowsPerPage: number
    isLoading: boolean
}
