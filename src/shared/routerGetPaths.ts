const routerGetPaths = () => ({
    home: '/',
    auth: '/auth',
    authWaitingEmailVerificationLink: '/auth/waiting-email-verification-link',
} as const)

export default routerGetPaths
