const routerGetPaths = () => ({
    root: '/',
    nouser: '/nouser',
    authWaitingEmailVerificationLink: 'waiting-email-verification-link',
    authProcessingLink: 'processing-link',
} as const)

export default routerGetPaths
