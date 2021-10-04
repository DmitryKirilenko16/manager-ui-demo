import makeStyles from '@material-ui/core/styles/makeStyles'
import {EToastColor} from '../../react-core/components/toast/toast.types'
import {important} from '../../react-core/utils/css/important'

export const useRoleChipClasses = makeStyles(() => ({
    admin: {},
    coWorker: {
        background: EToastColor.Success,
    },
    visitor: {
        background: '#fff',
        color: important('#000'),
    },
}))
