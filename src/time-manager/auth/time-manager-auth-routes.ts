import { AUTH_PATH } from 'main.container.routes'

export const LOGIN_PATH = '/login'
export const ERROR_PATH = '/error'
export const SUCCESS_PATH = '/success'


export const TIME_MANAGER_AUTH_ROUTES: any = Object.freeze({
    path: AUTH_PATH,
    description: 'Time manager Authentication',
    subrouting: {
        login: {
            path: LOGIN_PATH,
            description: 'Login',
        }, login2: {
            path: LOGIN_PATH + '2',
            description: 'Login',
        },
        error: {
            path: ERROR_PATH,
            description: 'Error',
        }
    },
})

export const TIME_MANAGER_AUTH_SUB_ROUTES = TIME_MANAGER_AUTH_ROUTES.subrouting
