import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Box from '@material-ui/core/Box'
import { EXTRA_COLORS_PALETTE } from '../material.theme'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import {useHomePageStyles} from 'time-manager/dashboard/components/homepage/home-page.styles'

interface ICtaButtonProps {
  title: string;
  subTitle: string;
  urlToRedirect: string;
  callback: () => void;
  Icon: () => JSX.Element;
}

const CtaButtonFC: React.FC<ICtaButtonProps> = ({
    title,
    subTitle,
    urlToRedirect,
    callback,
    Icon,
}) => {
    const classes = useHomePageStyles()
    const history = useHistory()

    const handleCtaAction = () => {
        history.push(urlToRedirect)
    }

    return (
        <Box className={classes.ctaButtonsBlock} onClick={handleCtaAction} p={3}>
            <div>
                <div>
                    <Fab
                        className={clsx(classes.icon)}
                        variant={'round'}
                        onClick={callback}
                        //TODO
                        style={{ background: 'violet' }}
                    >
                        <Icon />
                    </Fab>
                </div>
                <div className="ml-3">
                    <Typography
                        variant={'caption'}
                        style={{ color: EXTRA_COLORS_PALETTE.TEXT_GREY_MAIN }}
                    >
                        {title}
                    </Typography>
                    <Typography className="subtitle" variant={'body1'}>
                        {subTitle}
                    </Typography>
                </div>
            </div>

            <div>
        //TODO
                <AddIcon className="addButton" style={{ color: 'violet' }} />
            </div>
        </Box>
    )
}

export const CtaButton = CtaButtonFC

interface IGenericCircularSpinnerProps {
  size?: number;
  className?: string;
}

export const GenericCircularSpinner = (props: IGenericCircularSpinnerProps) => {
    return (
        <CircularProgress
            className={props?.className ? props?.className : ''}
            size={props?.size ? props.size : 10}
        />
    )
}
