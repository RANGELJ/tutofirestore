import type { Response } from 'express'
import unknownGetAsNumber from './unknownGetAsNumber'

const serverResponseGetUserId = (response: Response) => unknownGetAsNumber(response.locals.userId)

export default serverResponseGetUserId
