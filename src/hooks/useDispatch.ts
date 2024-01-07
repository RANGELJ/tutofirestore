import { useDispatch as useDispatchOriginal } from 'react-redux'
import { StoreAction } from '../shared/storeAction'

type Dispatch = (action: StoreAction) => void

const useDispatch = (): Dispatch => useDispatchOriginal()

export default useDispatch
