import React, {useMemo} from 'react'
import {
    Box,
    DialogContent,
    TextareaAutosize,
    Tooltip,
    Typography,
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import {useDispatch, useSelector} from 'react-redux'
import GenericInput from 'shared/GenericInput'
import GenericButton from 'shared/GenericButton'
import {useCreationStepStyles} from '../../styles/creationWizard.styles'
import clsx from 'clsx'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {
    createTimeSheet,
    deleteTimeSheet,
    updateTimeSheet,
} from 'time-manager/dashboard/components/time-sheets/time-sheets.utils'
import {TIME_MANAGER_BASIC_VALIDATIONS} from 'time-manager/auth/auth.constants'
import {closeCurrentDialog} from '../redux/dialogs.actions'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDialogStyles} from '../dialog.styles'
import {
    ContainerCardTable,
    ICardTableData,
} from 'shared/card-table/ContainerCardTable'
import {timeSheetSelector} from 'time-manager/dashboard/components/time-sheets/redux/time-sheets.selector'
import {EWhoseDetails} from 'shared/card-table/CardTable'
import {
    TIME_SHEETS_HOURS_ERROR
} from 'time-manager/dashboard/components/time-sheets/time-sheets.constants'
import {clearCurrentTimeSheet} from 'time-manager/dashboard/components/time-sheets/redux/time-sheets.actions'

export interface ITimeSheetDialogProps {
    date: string;
    creationStep: boolean;
    totalHours: number;
    queryId?: number;
    userProjects?: any;
    defaultRate?: number;
    hideButtons?: boolean;
}

export const TimeSheetDialog: React.FC<ITimeSheetDialogProps> = ({
    date,
    creationStep,
    totalHours,
    queryId,
    userProjects,
    defaultRate,
    hideButtons,
}) => {
    const dispatch = useDispatch()
    const classes = useCreationStepStyles()
    const dialogClasses = useDialogStyles()
    const timeSheet = useSelector(timeSheetSelector)
    const id = 1 // fake

    const userRate =
        userProjects?.find(
            (project: any) => project?.projectId === timeSheet?.projectId,
        )?.ratePerHour || defaultRate

    const formik = useFormik({
        initialValues: {
            taskDescription: creationStep ? '' : timeSheet?.taskDescription,
            date: creationStep ? '' : timeSheet?.date,
            hours: creationStep ? '' : timeSheet?.hours,
            projectId: creationStep ? '' : timeSheet?.projectId,
            ratePerHour: queryId ? userRate : '',
        },
        validationSchema: Yup.object().shape({
            taskDescription: Yup.string()
                .required('This field is required')
                .max(TIME_MANAGER_BASIC_VALIDATIONS.textFieldMaxLength, 'Too long'),
            hours: Yup.number()
                .required('This field is required')
                .max(
                    TIME_MANAGER_BASIC_VALIDATIONS.maxHours,
                    'Hours should be less than 24',
                )
                .min(TIME_MANAGER_BASIC_VALIDATIONS.minHours, 'Should be more than 0')
                .typeError('You must specify a number'),
            projectId: Yup.string()
                .required('This field is required')
                .max(TIME_MANAGER_BASIC_VALIDATIONS.textFieldMaxLength, 'Too long'),
        }),
        validateOnMount: true,
        onSubmit: () => {
        },
    })

    const handleCreate = () => {
        delete formik.values.ratePerHour
        dispatch(
            createTimeSheet(
                {...formik?.values, date: date},
                queryId ? queryId! : id!,
            ),
        )
    }

    const handleUpdateTimeSheet = () => {
        dispatch(
            updateTimeSheet(formik.values, timeSheet?.id!, queryId ? queryId! : id!),
        )
    }

    const handleDelete = () => {
        dispatch(deleteTimeSheet(timeSheet?.id, queryId ? queryId! : id!))
    }

    const handleClose = () => {
        dispatch(closeCurrentDialog())
        dispatch(clearCurrentTimeSheet())
    }

    //todo refactor two conditionals with one ? :, create one var
    const chekTotalHours = () => {
        if (formik?.values?.hours && creationStep) {
            return totalHours + +formik?.values?.hours > 24
        }

        if (formik?.values?.hours && timeSheet?.hours) {
            return totalHours + +formik?.values?.hours - timeSheet?.hours > 24
        }
    }

    const cardData: ICardTableData[] = useMemo(
        () => [
            {
                title: 'Task description',
                description: timeSheet?.taskDescription,
            },
            {
                title: 'Hours',
                description: timeSheet?.hours,
            }
        ],
        [timeSheet],
    )

    const generateTimeSheetForm = () => {
        return (
            <>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    <b>Task description</b>
                    <Tooltip title={'Task description' ?? ''}>
                        <InfoIcon className={classes.icon}/>
                    </Tooltip>
                </Typography>
                <div
                    className={clsx({
                        [classes.popupInput]: true,
                        [classes.input]: true,
                    })}
                >
                    <TextareaAutosize
                        className={clsx({
                            [classes.textArea]: true,
                            [classes.textAreaError]:
                            formik.touched.taskDescription &&
                            !!formik.errors.taskDescription,
                            [classes.semiDark]: !creationStep,
                        })}
                        value={formik.values.taskDescription}
                        name={'taskDescription'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={'Task description'}
                    />
                    <div
                        className={clsx({
                            [classes.textAreaErrorText]: true,
                            [classes.textAreaErrorTextVisible]:
                            formik.touched.taskDescription &&
                            !!formik.errors.taskDescription,
                        })}
                    >
                        {formik?.errors?.taskDescription}
                    </div>
                </div>

                <Typography variant="subtitle1" className={classes.subtitle}>
                    <b>Hours</b>
                    <Tooltip title={'Hours' ?? ''}>
                        <InfoIcon className={classes.icon}/>
                    </Tooltip>
                </Typography>
                <GenericInput
                    className={clsx({
                        [classes.popupInput]: true,
                        [classes.input]: true,
                    })}
                    variant={'outlined'}
                    label={'Hours'}
                    value={formik.values.hours}
                    name={'hours'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        (formik.touched.hours && formik.errors.hours) ||
                        (chekTotalHours() && TIME_SHEETS_HOURS_ERROR)
                    }
                    error={
                        (formik.touched.hours && !!formik.errors.hours) || chekTotalHours()
                    }
                />

                <Typography variant="subtitle1" className={classes.subtitle}>
                    <b>Project</b>
                    <Tooltip title={'Project' ?? ''}>
                        <InfoIcon className={classes.icon}/>
                    </Tooltip>
                </Typography>

                {!creationStep && (
                    <>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            <b>Rate</b>
                            <Tooltip title={'Rate' ?? ''}>
                                <InfoIcon className={classes.icon}/>
                            </Tooltip>
                        </Typography>
                        <GenericInput
                            className={clsx({
                                [classes.popupInput]: true,
                                [classes.input]: true,
                                [classes.disabled]: true,
                            })}
                            variant={'outlined'}
                            value={formik.values.ratePerHour}
                            name={'ratePerHour'}
                            disabled={true}
                        />
                    </>
                )}
            </>
        )
    }

    const setInitialValues = () => {
        formik.resetForm()
    }

    return (
        <>
            <Box className={dialogClasses.dialogWrap}>
                <DialogContent>
                    {creationStep ? (
                        <>
                            {generateTimeSheetForm()}
                            <div className={dialogClasses.popupCreateButtons}>
                                <GenericButton
                                    variant={'contained'}
                                    onClick={handleClose}
                                    className={dialogClasses.popupCreateButton}
                                >
                                    Back
                                </GenericButton>

                                <GenericButton
                                    variant={'contained'}
                                    onClick={handleCreate}
                                    endIcon={<ArrowForwardIosIcon/>}
                                    type="submit"
                                    className={clsx({
                                        [dialogClasses.popupCreateButton]: true,
                                        [dialogClasses.disabled]:
                                        !formik.isValid || chekTotalHours(),
                                    })}
                                    disabled={!formik.isValid || chekTotalHours()}
                                >
                                    Create
                                </GenericButton>
                            </div>
                        </>
                    ) : (
                        <ContainerCardTable
                            setInitialValues={setInitialValues}
                            whoseDetails={EWhoseDetails.TASK}
                            cardData={cardData}
                            form={generateTimeSheetForm()}
                            formikSubmitHandler={handleUpdateTimeSheet}
                            timeSheet
                            timeSheetDeleteAction={handleDelete}
                            hideButtons={hideButtons}
                            disabled={!formik.isValid || chekTotalHours()}
                        />
                    )}
                </DialogContent>
            </Box>
        </>
    )
}
