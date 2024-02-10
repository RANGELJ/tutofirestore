import { ClientInputErrorId, type ClientInputError } from './types'
import valueIsRecord from './valueIsRecord'

const valueIsClientInputError = (value: unknown): value is ClientInputError => {
    if (!valueIsRecord(value)) {
        return false
    }
    return value.id === ClientInputErrorId
}

export default valueIsClientInputError
