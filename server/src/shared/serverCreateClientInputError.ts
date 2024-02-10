export const ClientInputErrorSymbol = Symbol('InputError')

export type ClientInputError = {
    message: string;
    status: number;
    symbol: typeof ClientInputErrorSymbol;
}

const serverCreateClientInputError = (message: string): ClientInputError => ({
    message,
    status: 401,
    symbol: ClientInputErrorSymbol,
})

export default serverCreateClientInputError
