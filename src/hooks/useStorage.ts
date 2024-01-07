import { useStore as useStoreOriginal } from 'react-redux'
import type { Store } from '../shared/storeCreate'

const useStorage = (): Store => useStoreOriginal()

export default useStorage
