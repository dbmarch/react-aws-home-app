import { createSelector } from 'reselect'
import { getSession } from '.'
import { isEmpty } from 'lodash'

export const idTokenSelector = createSelector(
	getSession,
	session => {
		console.info(session)
		if (isEmpty(session)) return null
		return session.getIdToken().getJwtToken()
	}
)

export const accessTokenSelector = createSelector(
	getSession,
	session => {
		console.info(session)
		if (isEmpty(session)) return null
		return session.getAccessToken().getJwtToken()
	}
)

export const refreshTokenSelector = createSelector(
	getSession,
	session => {
		console.info(session)
		if (isEmpty(session)) return null
		return session.getRefreshToken().getJwtToken()
	}
)
