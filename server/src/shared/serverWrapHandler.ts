import { RequestHandler, Request } from 'express'

const serverWrapHandler = (base: (
    request: Request,
) => Promise<unknown>): RequestHandler => async (request, response, next) => {
    try {
        const result = await base(request)
        response.status(200)
        response.json(result)
    } catch (error) {
        next(error)
    }
}

export default serverWrapHandler
