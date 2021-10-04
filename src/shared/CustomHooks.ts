import { DependencyList, useEffect, useRef } from 'react'

export const useUpdate = <T extends DependencyList>(
    effect: (previousState: T) => void,
    deps: T
) => {
    const didMountRef = useRef(false)
    const prevState = useRef(deps)

    useEffect(() => {
        if (didMountRef.current) {
            effect(prevState.current)
            prevState.current = deps
        } else didMountRef.current = true
    // eslint-disable-next-line
  }, deps);
}
