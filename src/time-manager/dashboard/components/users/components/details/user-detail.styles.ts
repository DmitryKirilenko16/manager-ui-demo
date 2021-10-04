import makeStyles from '@material-ui/core/styles/makeStyles'
import {important} from 'react-core/utils/css/important'
import {EXTRA_COLORS_PALETTE} from 'material.theme'

export const useUsersDetailsStyles = makeStyles(() => ({
    userDetailsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        '& .part': {
            display: 'flex'
        }
    },
    userDetailsCard: {
        marginTop: 20
    },
    personalProjectsHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',

        '& svg': {
            color: important(EXTRA_COLORS_PALETTE.WHITE)
        },
    }
}))
