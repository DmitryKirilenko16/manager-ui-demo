import { TOKEN_KEY } from '../auth.constants'

export const loginDataUtil = () => {
    return {
        clearLoginDataFromStorage: () => {
            localStorage.removeItem(TOKEN_KEY)
        },
    }
}
