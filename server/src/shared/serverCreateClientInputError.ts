type ClientInputError = Error & { status?: number }

const serverCreateClientInputError = (message: string) => {
    const baseError = new Error(message)
    const error: ClientInputError = baseError
    error.status = 400
    return error
}

export default serverCreateClientInputError
