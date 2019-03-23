import * as AWS from 'aws-sdk'
import * as AwsAppSettings from '../aws/config'
import { takeLatest, call, select } from 'redux-saga/effects'
import { FETCH_PHOTO_LIST } from '../actions/action-types'
import { idTokenSelector } from '../selectors/authSelectors'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

import Promise from 'bluebird'
//PHOTO_BUCKET_NAME

//DOCUMENTATION
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html

// const userPool = new CognitoUserPool(AwsAppSettings.poolData)

const getS3 = idToken => {
	AWS.config.region = AwsAppSettings.AWS_REGION
	AWS.config.update({
		region: AwsAppSettings.AWS_REGION,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: AwsAppSettings.IDENTITY_POOL_ID,
			Logins: {
				// [`cognito-idp.${AWS_REGION}.amazonaws.com/${USER_POOL_ID}`]: idToken,
				'cognito-idp.us-east-2.amazonaws.com/us-east-2_zyce4X8Kl': idToken,
			},
		}),
	})

	const s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		params: { Bucket: AwsAppSettings.PHOTO_BUCKET_NAME },
	})
	return s3
}

const fetchPhotoListAsync = idToken => {
	const s3 = getS3(idToken)
	console.info('s3', s3)
	return new Promise((resolve, reject) => {
		s3.listObjects({ MaxKeys: 10 }, function(err, data) {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				console.info(data)
				resolve(data)
				// var albums = data.CommonPrefixes.map(function (commonPrefix) {
				//   var prefix = commonPrefix.Prefix;
				//   var albumName = decodeURIComponent(prefix.replace('/', ''));
			}
		})
	})
}

function* doFetchPhotoList() {
	console.info('doFetchPhotoList')
	try {
		const idToken = yield select(idTokenSelector)
		const photoList = yield call(fetchPhotoListAsync, idToken)
		console.info('photoList returned')
	} catch (err) {
		console.error(err)
	}
}

export function* fetchPhotoListSaga() {
	console.info('Saga-fetchPhotoList')
	yield takeLatest(FETCH_PHOTO_LIST, doFetchPhotoList)
}
