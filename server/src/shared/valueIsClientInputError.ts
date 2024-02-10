import valueIsRecord from 'shared/valueIsRecord'
import { ClientInputError, ClientInputErrorSymbol } from './serverCreateClientInputError'

const valueIsClientInputError = (value: unknown): value is ClientInputError => {
    if (!valueIsRecord(value)) {
        return false
    }
    return value.symbol === ClientInputErrorSymbol
}

export default valueIsClientInputError
