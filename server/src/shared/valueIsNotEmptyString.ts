const valueIsNotEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0

export default valueIsNotEmptyString
