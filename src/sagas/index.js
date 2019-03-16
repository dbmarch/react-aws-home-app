import { fork } from 'redux-saga/effects'
import { registerUser, loginUser } from './authenticate'
// const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield fork(helloSaga)
  yield fork(registerUser)
  yield fork(loginUser)
}
