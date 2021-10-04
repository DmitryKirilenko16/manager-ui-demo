export const SPINNER_ADD = 'SPINNER_ADD'
export const spinnerAdd = (featureName: string) => ({type: 'SPINNER_ADD', payload: featureName})

export const SPINNER_REMOVE = 'SPINNER_REMOVE'
export const spinnerRemove = (featureName: string) => ({type: 'SPINNER_REMOVE', payload: featureName})

