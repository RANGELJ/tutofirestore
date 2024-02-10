import { ClientInputError, ClientInputErrorSymbol } from './serverCreateClientInputError';
import valueIsRecord from './valueIsRecord';

const valueIsClientInputError = (value: unknown): value is ClientInputError => {
    if (!valueIsRecord(value)) {
        return false
    }
    return value.symbol === ClientInputErrorSymbol
}

export default valueIsClientInputError
