import {useCallback, useEffect, useMemo, useState} from 'react'
import {DESKTOP_DEFAULT_SCREEN, LAPTOP_DEFAULT_SCREEN, LAPTOP_SMALL_SCREEN} from './core.constants'
import {Theme, useMediaQuery} from '@material-ui/core'

interface IDeviceInfo {
    currentScreenWidth: number,
    currentScreenHeight: number,
}

interface IUseScreenReturnedType {
    screenInfo: IDeviceInfo,
    isDefaultLaptop: boolean,
    isSmallLaptop: boolean,
    isMobile: boolean,
    getIsCurrentScreenLessOrEqual: (width: number) => boolean
}

export function useScreen(): IUseScreenReturnedType {
    const [screenInfo, setScreenInfo] = useState<IDeviceInfo>({} as IDeviceInfo)

    useEffect(() => {
        setScreenInfo({
            currentScreenWidth: window.innerWidth,
            currentScreenHeight: window.innerHeight,
        })
    }, [])

    const isDefaultLaptop = useMemo(
        () => {
            return !!screenInfo.currentScreenWidth && (
                screenInfo.currentScreenWidth < DESKTOP_DEFAULT_SCREEN &&
                screenInfo.currentScreenWidth <= LAPTOP_DEFAULT_SCREEN &&
                screenInfo.currentScreenWidth > LAPTOP_SMALL_SCREEN
            )
        },
        [screenInfo.currentScreenWidth],
    )

    const isSmallLaptop = useMemo(
        () => {
            return !!screenInfo.currentScreenWidth && screenInfo.currentScreenWidth <= LAPTOP_SMALL_SCREEN
        },
        [screenInfo.currentScreenWidth],
    )

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const getIsCurrentScreenLessOrEqual = useCallback(
        (width: number) => {
            return screenInfo.currentScreenWidth <= width
        },
        [screenInfo.currentScreenWidth],
    )

    return {
        screenInfo,
        isDefaultLaptop,
        isSmallLaptop,
        isMobile,
        getIsCurrentScreenLessOrEqual,
    }
}
