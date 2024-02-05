import { redirect } from 'react-router-dom'
import routerGetPath from './routerGetPath'

let redirectionCounter = 0
let timeoutRef: NodeJS.Timeout | undefined

const routerCreateRedirectResponse = (...args: Parameters<typeof routerGetPath>) => {
    clearTimeout(timeoutRef)

    redirectionCounter += 1

    timeoutRef = setTimeout(() => {
        redirectionCounter = 0
    }, 1000)

    if (redirectionCounter > 3) {
        throw new Error(`Too many redirections to page: ${JSON.stringify(args)}`)
    }

    return redirect(routerGetPath(...args))
}

export default routerCreateRedirectResponse
