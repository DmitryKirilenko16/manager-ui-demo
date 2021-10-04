export interface IStep {
    label: string
    active: boolean
    icon: string | JSX.Element
}

export interface ISelectableCardConfig<T = any> {
    value: T;
    icon: JSX.Element;
    label: string;
    visible?: boolean
}
