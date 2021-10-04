import { FC, memo, MutableRefObject } from 'react'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import GenericButton from '../GenericButton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as React from 'react'
import useCreationWizardStyles from '../styles/creationWizard.styles'
import { useTranslation } from 'react-i18next'

interface IWizardNavigationProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  isNextButtonDisabled: boolean;
  isLoading: boolean;
  maxStep: number;
  nextButtonRef?: MutableRefObject<any>;
  isNextStepButtonHidden?: boolean;
  disabledForwardButtonText?: string;
  createWhat?: string;
}

export const WizardNavigation: FC<IWizardNavigationProps> = memo(
    ({
        step,
        prevStep,
        nextStep,
        isNextButtonDisabled,
        isLoading,
        maxStep,
        nextButtonRef,
        isNextStepButtonHidden = false,
        disabledForwardButtonText,
        createWhat
    }) => {
        const classes = useCreationWizardStyles()
        const { t } = useTranslation()

        return (
            <Box className={clsx(classes.navigation)}>
                <Box>
                    <Typography variant={'body2'} className={classes.stepCounter}>
            Step {step + 1}/{maxStep + 1}
                    </Typography>
                </Box>
                <Box className={clsx({ buttons: true, [classes.wizardButtons]: true })}>
                    <GenericButton
                        variant={'outlined'}
                        onClick={prevStep}
                        className={classes.wizardBackButton}
                    >
            Back
                    </GenericButton>
                    {!isNextStepButtonHidden && (
                        <GenericButton
                            variant={'contained'}
                            onClick={nextStep}
                            endIcon={<ArrowForwardIosIcon />}
                            disabled={isNextButtonDisabled}
                            type="submit"
                            ref={nextButtonRef}
                            className={clsx({
                                [classes.wizardDisabledButton]: isNextButtonDisabled,
                            })}
                        >
                            {(isNextButtonDisabled && disabledForwardButtonText) ||
                t(step === maxStep ? `Create ${createWhat}` : 'Next step')}
                            {isLoading && <CircularProgress className={classes.spinner} />}
                        </GenericButton>
                    )}
                </Box>
            </Box>
        )
    }
)
