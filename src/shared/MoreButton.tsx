import * as React from 'react'
import { useRef, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MoreVert from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { EXTRA_COLORS_PALETTE } from '../material.theme'
import { darken } from '@material-ui/core'

interface IOption {
  name: string;
  action: (e: React.MouseEvent<HTMLElement>) => any;
  icon?: JSX.Element;
  disabled?: boolean;
}

interface IMorButtonProps {
  options?: IOption[];
  moreBtnClickCallback?: () => void;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        menu: {
            '& .MuiMenu-list': {
                background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
            },
        },
        buttonWrap: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            outline: 'none !important',
            padding: '0 !important',
        },
        '& .MuiMenu-list': { background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND },
        item: {
            color: EXTRA_COLORS_PALETTE.WHITE,
            background: EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND,
            width: '100%',
            minWidth: 172,
            justifyContent: 'space-between',
            '& svg': {
                color: EXTRA_COLORS_PALETTE.WHITE,
            },
            '&:hover': {
                backgroundColor: darken(EXTRA_COLORS_PALETTE.OFFICIAL_BACKGROUND, 0.2),
            },
            '&:hover svg': {
                color: EXTRA_COLORS_PALETTE.SECONDARY.MAIN,
            },
        },
    })
)

const MoreButton: React.FC<IMorButtonProps> = ({
    options,
    moreBtnClickCallback,
}) => {
    const classes = useStyles()

    const buttonRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div
            className={classes.buttonWrap}
            onClick={(e) => {
                /** Avoiding event bubbling */
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()

                if (moreBtnClickCallback) {
                    moreBtnClickCallback()
                }
            }}
        >
            <IconButton
                aria-label="more"
                onClick={handleClick}
                ref={buttonRef}
                className={classes.button}
            >
                <MoreVert />
            </IconButton>
            {options && (
                <Menu
                    open={open}
                    onClose={handleClose}
                    anchorEl={buttonRef?.current}
                    anchorReference="anchorEl"
                    getContentAnchorEl={null}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    className={classes.menu}
                >
                    {options?.map((option) => (
                        <MenuItem
                            key={option.name}
                            className={classes.item}
                            onClick={(e) => {
                                handleClose()
                                option.action(e)
                            }}
                            disabled={option.disabled}
                        >
                            <Typography variant="inherit" noWrap>
                                {option.name}
                            </Typography>
                            {option.icon}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    )
}

export default MoreButton
