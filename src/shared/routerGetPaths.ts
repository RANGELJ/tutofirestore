const routerGetPaths = () => ({
    root: '/',
    auth: '/auth',
    authWaitingEmailVerificationLink: '/auth/waiting-email-verification-link',
    authProcessingLink: '/auth/processing-link',
} as const)

export default routerGetPaths
