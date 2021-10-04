import React, {FC, memo, ReactText, useState} from 'react'
import {useTranslation} from 'react-i18next'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'

import {GenericCircularSpinner} from '../CtaButton'
import GenericButton from '../GenericButton'
import {CardTable, EWhoseDetails} from './CardTable'
import {useCardTableStyles} from './card-table.styles'
import clsx from 'clsx'
import DeleteIcon from '@material-ui/icons/Delete'
import {ERole} from '../../time-manager/auth/auth.constants'

type CardTableDataField = string | ReactText | JSX.Element

export interface ICardTableData {
    title: string;
    description?: CardTableDataField;
}

export interface IContainerCardTableProps {
    cardData: ICardTableData[];
    form?: JSX.Element;
    formBelow?: JSX.Element;
    formikSubmitHandler?: () => any;
    isEditModeCustom?: boolean;
    setCustomEditMode?: (value: boolean) => void;
    saveEditCodeButtonRef?: any;
    isLoading?: boolean;
    isSimpleCard?: boolean;
    customSaveButtonI18nTitle?: string;
    tipTitleI18nKey?: string;
    tipDescriptionI18nKey?: string;
    actionRightButtonCallback?: () => void;
    actionRightButtonI18nKeyTitle?: string;
    headerTitle?: string | JSX.Element;
    customMainWrapClass?: string;
    actionRightButtonInPending?: boolean;
    isModifyButtonDisabled?: boolean;
    usersBgc?: boolean;
    whoseDetails?: string;
    timeSheet?: boolean;
    timeSheetDeleteAction?: () => void;
    disabled?: boolean;
    showDeleteButton?: boolean;
    hideEditButton?: boolean;
    hideButtons?: boolean;
    setInitialValues?: () => void;
}

export const ContainerCardTable: FC<IContainerCardTableProps> = memo(
    (props) => {
        const {
            cardData,
            form,
            formikSubmitHandler,
            formBelow,
            isEditModeCustom,
            setCustomEditMode,
            saveEditCodeButtonRef,
            isLoading,
            customSaveButtonI18nTitle,
            tipTitleI18nKey,
            tipDescriptionI18nKey,
            actionRightButtonCallback,
            actionRightButtonI18nKeyTitle = '',
            actionRightButtonInPending,
            isModifyButtonDisabled = false,
            usersBgc,
            whoseDetails,
            timeSheet,
            timeSheetDeleteAction,
            disabled,
            showDeleteButton,
            hideEditButton,
            hideButtons,
            setInitialValues,
        } = props

        const [isEditMode, setEditMode] = useState(false)
        const cardTableClasses = useCardTableStyles()
        const {t} = useTranslation()
        const currentRole = ERole.ADMIN // fake

        const isEditModeCustomBool = typeof isEditModeCustom === 'boolean'

        const isEditModeTurnedOn = isEditModeCustom || isEditMode

        const isEditModeTurnedOff = isEditModeCustomBool
            ? !isEditModeCustom
            : !isEditMode

        const cardDataJsx = (
            <>
                <Box
                    className={clsx({
                        [cardTableClasses.cardInfo]: true,
                        [cardTableClasses.usersDetailsBackground]: usersBgc,
                    })}
                >
                    {cardData.map((item) => (
                        <Card key={item.title} className={cardTableClasses.itemCard}>
                            <CardHeader
                                className={clsx({
                                    [cardTableClasses.nestedHeader]: true,
                                    [cardTableClasses.usersDetailsBackground]: usersBgc,
                                })}
                                title={
                                    <span>
                                        {item.title}
                                        {isLoading && <GenericCircularSpinner className="ml-2"/>}
                                    </span>
                                }
                                subheader={<span>{item.description || '-'}</span>}
                            />
                        </Card>
                    ))}
                </Box>
                {actionRightButtonI18nKeyTitle && actionRightButtonCallback && (
                    <div className={cardTableClasses.actionRightButtonWrap}>
                        <GenericButton
                            variant="contained"
                            onClick={actionRightButtonCallback}
                            disabled={actionRightButtonInPending}
                        >
                            {actionRightButtonInPending && <GenericCircularSpinner/>}{' '}
                            {t(actionRightButtonI18nKeyTitle)}
                        </GenericButton>
                    </div>
                )}
            </>
        )

        const cardHeaderAction =
            (formBelow || form) &&
            whoseDetails !== EWhoseDetails.CUSTOMER &&
            !hideButtons ? (
                    <CardActions>
                        {isEditModeTurnedOff &&
                    (currentRole === ERole.ADMIN ||
                        whoseDetails === EWhoseDetails.TASK ||
                        whoseDetails === EWhoseDetails.PROFILE ||
                        whoseDetails === EWhoseDetails.USER_PROJECT) ? (
                                <>
                                    {/*TODO delete timeSheet, need only showDeleteButton*/}
                                    {(timeSheet || showDeleteButton) && (
                                        <Button
                                            className={clsx(cardTableClasses.actionButton)}
                                            startIcon={<DeleteIcon/>}
                                            // TODO
                                            onClick={timeSheetDeleteAction}
                                        >
                                            {/*TODO create one prop*/}
                                            {timeSheet ? 'Delete task' : 'Delete user project'}
                                        </Button>
                                    )}
                                    {!hideEditButton && (
                                        <Button
                                            className={clsx(cardTableClasses.actionButton)}
                                            startIcon={<EditIcon/>}
                                            onClick={() => {
                                                setInitialValues && setInitialValues()
                                                setCustomEditMode
                                                    ? setCustomEditMode(true)
                                                    : setEditMode(true)
                                            }
                                            }
                                            disabled={isModifyButtonDisabled}
                                        >
                                            {/*TODO*/}
                                            {'Edit ' + whoseDetails}
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <>
                                    {(currentRole === ERole.ADMIN ||
                                whoseDetails === EWhoseDetails.TASK ||
                                whoseDetails === EWhoseDetails.PROFILE) && (
                                        <>
                                            <Button
                                                className={cardTableClasses.actionButton}
                                                startIcon={<CancelIcon/>}
                                                onClick={() =>
                                                    setCustomEditMode
                                                        ? setCustomEditMode(false)
                                                        : setEditMode(false)
                                                }
                                            >
                                        Close
                                            </Button>
                                            <Button
                                                className={clsx({
                                                    [cardTableClasses.actionButton]: true,
                                                    [cardTableClasses.actionButtonDisabled]: disabled,
                                                })}
                                                variant="outlined"
                                                disabled={disabled}
                                                onClick={() => {
                                                    formikSubmitHandler && formikSubmitHandler()
                                                    setCustomEditMode
                                                        ? setCustomEditMode(false)
                                                        : setEditMode(false)
                                                }}
                                                ref={saveEditCodeButtonRef}
                                            >
                                                {isLoading && <GenericCircularSpinner className="mr-2"/>}
                                                {customSaveButtonI18nTitle
                                                    ? t(customSaveButtonI18nTitle)
                                                    : 'Save'}
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                    </CardActions>
                ) : (
                    <></>
                )

        return (
            <CardTable
                {...props}
                headerTitle={`${whoseDetails} details`}
                cardTableClasses={cardTableClasses}
                isEditModeTurnedOff={isEditModeTurnedOff}
                isEditModeTurnedOn={isEditModeTurnedOn}
                cardDataJsx={cardDataJsx}
                cardHeaderAction={cardHeaderAction}
                tipTitleI18nKey={t(
                    tipTitleI18nKey || '',
                )}
                tipDescriptionI18nKey={t(
                    tipDescriptionI18nKey || '',
                )}
            />
        )
    },
)
