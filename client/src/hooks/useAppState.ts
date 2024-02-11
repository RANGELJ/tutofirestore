import { useEffect, useRef, useState } from 'react'
import appStateStore, { AppStateSelector } from '../shared/appStateStore'

const useAppState = <T>(selector: AppStateSelector<T>) => {
    const selectorRef = useRef(selector)
    const [state, setState] = useState(selectorRef.current(appStateStore.getState()))

    useEffect(() => appStateStore.subscribe(() => {
        setState(selectorRef.current(appStateStore.getState()))
    }), [])

    return state
}

export default useAppState
