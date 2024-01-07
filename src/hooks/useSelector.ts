import { useSelector as useSelectorOriginal } from 'react-redux'
import { StoreState } from '../shared/storeState'

const useSelector = <T>(
    selector: (state: StoreState) => T
): T => useSelectorOriginal(selector)

export default useSelector
