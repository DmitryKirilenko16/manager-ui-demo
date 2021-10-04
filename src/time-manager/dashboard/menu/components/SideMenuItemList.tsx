import * as React from 'react'
import clsx from 'clsx'
import {useDashboardRouteStyles} from '../../dashboard-route.styles'
import {ISideMenuItem} from '../side.menu.types'
import {SIDE_MENU_ITEM} from '../side.menu.constants'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'


export const SideMenuItemList: React.FC = () => {
    const classes = useDashboardRouteStyles()

    return (
        <List className={classes.menuList}>
            {SIDE_MENU_ITEM.map((currentVal: ISideMenuItem, index) => {

                return (
                    <NavLink
                        activeClassName={classes.activeMenuLink}
                        key={currentVal.label + `side_menu ${index}`}
                        className={clsx(classes.menuLink)}
                        to={currentVal.path}
                    >
                        <ListItem
                            className={clsx('list-item', currentVal.className)}
                            button
                        >
                            <ListItemText>
                                <Typography className="text">
                                    {currentVal.label}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </NavLink>
                )
            },
            )}
        </List>
    )
}
