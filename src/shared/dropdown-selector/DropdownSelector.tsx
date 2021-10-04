import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import clsx from 'clsx'
import {InputLabel, MenuItem, Select} from '@material-ui/core'
import {useDropdownSelectorStyles} from './dropdown-selector.styles'
import {IOption} from '../models/options.models'

export interface ISelectorProps {
    options: IOption[];
    value: string | number | boolean;
    onChange: (e: any) => void;
    label: string;
    extraClasses?: any;
    semiDarkBgc?: boolean;
    disabled?: boolean;
    name: string;
}

export const DropdownSelector: React.FC<ISelectorProps> = ({
    options,
    value,
    onChange,
    label,
    extraClasses,
    semiDarkBgc,
    disabled,
    name
}) => {
    const classes = useDropdownSelectorStyles()
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div
            className={clsx({
                [classes.selectorContainer]: true,
            })}
        >
            <FormControl
                disabled={disabled}
                className={clsx({
                    [classes.formControl]: true,
                    [extraClasses?.bgcDefault]: extraClasses,
                    [classes.semiDarkBgc]: semiDarkBgc,
                    [classes.disabled]: disabled
                })}
            >
                <InputLabel
                    id="demo-controlled-open-select-label"
                    className={classes.label}
                >
                    {label}
                </InputLabel>
                <Select
                    className={clsx({
                        [classes.selector]: true,
                        [classes.disabled]: disabled,
                    })}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={value || ''}
                    onChange={onChange}
                    name={name}
                >
                    {options && (
                        options.map((item: IOption) => {
                            return (
                                <MenuItem
                                    value={item.value as string}
                                    className={classes.menuItem}
                                >
                                    {item.label}
                                </MenuItem>
                            )
                        })
                    )}
                </Select>
            </FormControl>
        </div>
    )
}
