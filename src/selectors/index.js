export const isAuthLoading = state => state.auth.isLoading
export const getAuthError = state => state.auth.authError
export const isAuthenticated = state => state.auth.isAuthenticated
export const getUser = state => state.auth.user
export const getUserCode = state => state.auth.userCode
export const getAuthenticatedUser = state => state.auth.authenticatedUser
export const getSession = state => state.auth.session
export const getNewPassword = state => state.auth.newPassword

// it would be good to have thumbnails returned with this list.
export const getPhotoList = state => state.photo.photoList

// List of the downloaded photos
export const getPhotoSrcList = state => state.photo.photoSrcList
