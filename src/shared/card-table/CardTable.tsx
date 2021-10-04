import React, { FC, memo } from 'react'
import clsx from 'clsx'

import CardContent from '@material-ui/core/CardContent'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'

import { IContainerCardTableProps } from './ContainerCardTable'

import { TCardTableStyles } from './card-table.styles'
import { EXTRA_COLORS_PALETTE } from '../../material.theme'

export interface ICardTableProps extends IContainerCardTableProps {
  cardTableClasses: TCardTableStyles;
  isEditModeTurnedOff: boolean;
  isEditModeTurnedOn: boolean;
  cardDataJsx: React.ReactNode;
  cardHeaderAction: React.ReactNode;
}

export enum EWhoseDetails {
  CUSTOMER = 'Customer',
  TASK = 'Task',
  PROJECT = 'Project',
  PROFILE = 'Profile',
  USER = 'User',
  USER_PROJECT = 'User project',
}

export const CardTable: FC<ICardTableProps> = memo((props) => {
    const {
        usersBgc,
        cardTableClasses,
        customMainWrapClass,
        headerTitle,
        formBelow,
        form,
        isEditModeTurnedOff,
        isEditModeTurnedOn,
        isSimpleCard,
        cardDataJsx,
        cardHeaderAction,
        whoseDetails,
    } = props

    return (
        <Card
            className={clsx(
                {
                    [cardTableClasses.card]: true,
                    [cardTableClasses.usersDetailsBackground]: usersBgc,
                },
                customMainWrapClass
            )}
        >
            <CardHeader
                title={<span className="title">{headerTitle}</span>}
                className={clsx({
                    [cardTableClasses.cardHeader]: true,
                    //TODO
                    [cardTableClasses.semiDarkHeader]:
            whoseDetails === EWhoseDetails.TASK ||
            whoseDetails === EWhoseDetails.PROFILE ||
            whoseDetails === EWhoseDetails.USER_PROJECT,
                })}
                action={cardHeaderAction}
            />

            <Accordion
                expanded={form && isEditModeTurnedOn}
                style={{
                    borderBottom: `1px solid ${EXTRA_COLORS_PALETTE.WHITE}`,
                    boxShadow: 'none',
                    margin: 0,
                    background: usersBgc
                        ? EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND
                        : EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND_SEMI_DARK,
                }}
            >
                <AccordionSummary style={{ display: 'none' }}>
                    <></>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        className={clsx({
                            [cardTableClasses.info]: true,
                            [cardTableClasses.usersDetailsBackground]: usersBgc,
                            [cardTableClasses.timeSheetDialogInfo]: whoseDetails === EWhoseDetails.TASK
                        })}
                    >
                        <Typography variant="subtitle2">
                            <b>You are editing a {whoseDetails?.toLowerCase()}</b>
                        </Typography>
                        <Typography variant="caption">
              Fill in the fields and save to complete the operation
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <CardContent className={cardTableClasses.tableContent}>
                {form && isEditModeTurnedOn && (
                    <Box
                        className={clsx({
                            [cardTableClasses.cardInfo]: true,
                            [cardTableClasses.usersDetailsBackground]: usersBgc,
                        })}
                    >
                        {form}
                    </Box>
                )}
                {form && isEditModeTurnedOff && cardDataJsx}
                {(isSimpleCard || formBelow) && cardDataJsx}
            </CardContent>

            <Accordion
                expanded={formBelow && isEditModeTurnedOn}
                style={{ border: 'none', boxShadow: 'none', margin: 0 }}
            >
                <AccordionSummary style={{ display: 'none' }}>
                    <></>
                </AccordionSummary>
                <AccordionDetails>{formBelow}</AccordionDetails>
            </Accordion>
        </Card>
    )
})
