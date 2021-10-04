import {LAPTOP_DEFAULT_SCREEN} from '../../core.constants'

export const flex = (
    areItemsVerticalCentered?: boolean,
    areItemsHorizontalCentered?: boolean,
    gap?: number,
    customJustifyContent?: 'initial' | 'flex-start' | 'flex-end' | 'space-around'
) => ({
    display: 'flex',
    justifyContent:
    customJustifyContent ||
    (areItemsHorizontalCentered ? 'center' : 'space-between'),
    alignItems: areItemsVerticalCentered ? 'center' : 'initial',
    gap,
})

export const responsive = (stylesBlock = {} as { [x: string]: any }, maxWidth = LAPTOP_DEFAULT_SCREEN) => {
    return {
        [`@media only screen and (max-width: ${maxWidth}px)`]: {
            ...stylesBlock,
        },
    }
}
