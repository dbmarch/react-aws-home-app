import * as AWS from 'aws-sdk'
import * as AwsAppSettings from '../aws/config'
import { takeLatest, call, select, put } from 'redux-saga/effects'
import { FETCH_PHOTO_LIST, DOWNLOAD_PHOTOS } from '../actions/action-types'
import { idTokenSelector } from '../selectors/authSelectors'
import { getPhotoList } from '../selectors'
import { addPhotoSrcList, setPhotoList } from '../actions'

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

const fetchPhotoImageAsync = async (s3, fileName) => {
	console.info('fetching photo image', fileName)
	return new Promise((resolve, reject) => {
		s3.getObject({ Key: fileName }, function(err, data) {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				console.info('image', data)
				resolve(data)
				// var albums = data.CommonPrefixes.map(function (commonPrefix) {
				//   var prefix = commonPrefix.Prefix;
				//   var albumName = decodeURIComponent(prefix.replace('/', ''));
			}
		})
	})
}
const encode = data => {
	var str = data.reduce(function(a, b) {
		return a + String.fromCharCode(b)
	}, '')
	return btoa(str).replace(/.{76}(?=.)/g, '$&\n')
}

const downloadPhotos = async (s3, fileList) => {
	const imageObjectList = await Promise.all(fileList.map(file => fetchPhotoImageAsync(s3, file.Key)))

	const imageSrcList = imageObjectList.map(image => 'data:image/jpeg;base64,' + encode(image.Body))
	return imageSrcList
}

export const downloadPhoto = async (s3, fileName) => {
	try {
		const image = await fetchPhotoImageAsync(s3, fileName)
		const src = 'data:image/jpeg;base64,' + encode(image.Body)
		return src
	} catch (err) {
		return null
	}
}

const fetchPhotoListAsync = async s3 => {
	return new Promise((resolve, reject) => {
		s3.listObjectsV2({ MaxKeys: 10 }, async function(err, data) {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				console.info(data)
				// this object has IsTrucated and NextContinuationToken
				// const imageSrcList = downloadPhotos(s3, data.Contents)
				resolve(data.Contents)
			}
		})
	})
}

function* doFetchPhotoList() {
	console.info('doFetchPhotoList')
	try {
		const idToken = yield select(idTokenSelector)
		const s3 = getS3(idToken)
		const photoList = yield call(fetchPhotoListAsync, s3)
		console.info('photoList returned', photoList)
		yield put(setPhotoList(photoList))
		yield call(doDownloadPhotos)
	} catch (err) {
		console.error(err)
	}
}

function* doDownloadPhotos() {
	console.info('doDownloadPhotos')
	try {
		const idToken = yield select(idTokenSelector)
		const s3 = getS3(idToken)
		const photoList = yield select(getPhotoList)

		console.info('photoList to download: ', photoList)
		for (let i in photoList) {
			console.info('downloading ', photoList[i])
			const photoSrc = yield call(downloadPhoto, s3, photoList[i].Key)
			yield put(addPhotoSrcList(photoSrc))
		}

		console.info('photo Src List created')
	} catch (err) {
		console.error(err)
	}
}

export function* fetchPhotoListSaga() {
	console.info('Saga-fetchPhotoList')
	yield takeLatest(FETCH_PHOTO_LIST, doFetchPhotoList)
}

export function* downloadPhotosSaga() {
	console.info('Saga-downloadPhotos')
	yield takeLatest(DOWNLOAD_PHOTOS, doDownloadPhotos)
}
