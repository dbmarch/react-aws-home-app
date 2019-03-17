export const isAuthLoading = state => state.auth.isLoading
export const isAuthFailed = state => state.auth.authFailed
export const isAuthenticated = state => state.auth.isAuthenticated
export const getUser = state => state.auth.user
export const getAuthenticatedUser = state => state.auth.authenticatedUser
export const getUserPool = state => state.auth.userPool
export const getSession = state => state.auth.session
