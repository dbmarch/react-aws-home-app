import * as AWS from 'aws-sdk/global'
import * as AwsAppSettings from '../aws/config'
import { takeLatest, call } from 'redux-saga/effects'
import { FETCH_PHOTO_LIST } from '../actions/action-types'

import { CognitoUserPool } from 'amazon-cognito-identity-js'

import Promise from 'bluebird'
//PHOTO_BUCKET_NAME

//DOCUMENTATION
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html

// const userPool = new CognitoUserPool(AwsAppSettings.poolData)

const getS3 = () => {
	AWS.config.update({
		region: AwsAppSettings.AWS_REGION,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: AwsAppSettings.IDENTITY_POOL_ID,
		}),
	})

	const s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		params: { Bucket: AwsAppSettings.PHOTO_BUCKET_NAME },
	})
	return s3
}

const fetchPhotoListAsync = () => {
	const s3 = getS3()

	return new Promise((resolve, reject) => {
		s3.listObjects({ Delimiter: '/' }, function(err, data) {
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
		const photoList = yield call(fetchPhotoListAsync)
		console.info('photoList returned')
	} catch (err) {
		console.error(err)
	}
}

export function* fetchPhotoListSaga() {
	console.info('Saga-fetchPhotoList')
	yield takeLatest(FETCH_PHOTO_LIST, doFetchPhotoList)
}
