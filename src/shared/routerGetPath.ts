type RouterGetPathParams =
    ['root']
    | ['nouser']
    | ['nouser/waitingEmailVerificationLink']
    | ['nouser/processingLink']


const routerGetPath = (...args: RouterGetPathParams): string => {
    const [name] = args

    switch (name) {
    case 'nouser':
        return '/nouser'
    case 'nouser/waitingEmailVerificationLink':
        return `${routerGetPath('nouser')}/waiting-email-verification-link`
    case 'nouser/processingLink':
        return `${routerGetPath('nouser')}/processing-link`
    default:
        return '/'
    }
}

export default routerGetPath
