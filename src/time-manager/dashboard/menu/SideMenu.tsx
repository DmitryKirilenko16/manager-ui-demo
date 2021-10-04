import React from 'react'
import { Box } from '@material-ui/core'
import { useDashboardRouteStyles } from '../dashboard-route.styles'
import { EXTRA_CONST_MEASUREMENTS } from '../../../material.theme'
import { SideMenuUserInfo } from './components/SideMenuUserInfo'
import { SideMenuItemList } from './components/SideMenuItemList'
import { ReactComponent as Logo } from 'assets/img/shared/logo.svg'
import clsx from 'clsx'

interface ISideMenuProps {
  isHidden?: boolean;
}

export const SideMenu: React.FC<ISideMenuProps> = ({ isHidden }) => {
    const classes = useDashboardRouteStyles()

    return (
        <Box
            className={clsx({
                [classes.menuPanel]: true,
                [classes.displayNone]: isHidden,
                [classes.displayFlex]: !isHidden,
            })}
            boxShadow={EXTRA_CONST_MEASUREMENTS.BOX_SHADOW}
            zIndex={1}
        >
            <div>
                <div className={classes.menuHeader}>
                    {/* UPPER LOGO */}
                    <Logo />

                    {/* USER INFORMATIONS */}
                    <SideMenuUserInfo />
                </div>

                {/* LIST OF ITEM */}
                <SideMenuItemList />
            </div>
        </Box>
    )
}
