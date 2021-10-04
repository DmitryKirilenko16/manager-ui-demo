export interface IRoutePge {
    [key: string]: IRoute
}

export interface IRoute {
    path: string
    description: string
    subrouting?: IRoutePge
}

export interface IRouter extends IRoute{
    subrouting: IRoutePge
}
