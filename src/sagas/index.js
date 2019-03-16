import { put, takeEvery, all } from 'redux-saga/effects'
import authenticate from './authenticate'
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield all([ helloSaga(), authenticate() ])
}
