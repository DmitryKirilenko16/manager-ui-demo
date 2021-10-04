import * as React from 'react'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import { useCallback } from 'react'
import { IStep } from './stepper.types'
import { useScreen } from '../../react-core/core.hooks'
import { useHeaderStepperStyles } from './styles/header-stepper-styles'

interface IHeaderStepper {
  steps: IStep[];
  currentStep: number;
}

const HeaderStepper: React.FunctionComponent<IHeaderStepper> = ({
    steps,
    currentStep,
}) => {
    const { isMobile } = useScreen()
    const classes = useHeaderStepperStyles()

    const getStepBox = useCallback(
        (step: IStep, index?: number) => {
            return (
                <Box
                    className={classes.step}
                    key={typeof index === 'number' ? `${step.label} ${index}` : ''}
                >
                    <Box className={clsx(classes.icon, { active: step.active })}>
                        {step.icon}
                    </Box>
                    <Box className={clsx(classes.label, { active: step.active })}>
                        {step.label}
                    </Box>
                </Box>
            )
        },
        [classes]
    )

    return (
        <Box className={classes.stepper}>
            {isMobile
                ? getStepBox(steps[currentStep])
                : steps.map((s, index) => getStepBox(s, index))}
        </Box>
    )
}

export default HeaderStepper
