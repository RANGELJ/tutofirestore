import type { ClientInputError } from 'shared/types'

const serverCreateClientInputError = (message: string): ClientInputError => ({
    message,
    status: 401,
    id: '6MvpZ0ful3B8jGQHvn1CNqUyZuoBjMOi',
})

export default serverCreateClientInputError
