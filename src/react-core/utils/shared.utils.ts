import {INPUT_NUMBER_DISABLED_VALUES} from '../core.constants'

export const inputNumberKeydownCallback = (e: any) => {
    if (INPUT_NUMBER_DISABLED_VALUES.includes(e.key)) {
        e.preventDefault()
    }
}
