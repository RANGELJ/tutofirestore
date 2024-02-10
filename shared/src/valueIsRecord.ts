const valueIsRecord = (value: unknown): value is Record<string | number, unknown> => {
    if (typeof value !== 'object' || value === null) {
        return false
    }
    return true
}

export default valueIsRecord
