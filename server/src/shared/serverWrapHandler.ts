import { RequestHandler, Request, Response } from 'express'
import valueIsClientInputError from 'shared/valueIsClientInputError'

const serverWrapHandler = (base: (
    request: Request,
    response: Response,
) => Promise<unknown>): RequestHandler => async (request, response) => {
    try {
        const result = await base(request, response)
        response.status(200)
        response.json(result)
    } catch (error) {
        if (valueIsClientInputError(error)) {
            response.status(error.status)
            response.json(error)
        } else {
            response.status(500)
            response.json({ message: 'unknown error' })
        }
    }
}

export default serverWrapHandler
