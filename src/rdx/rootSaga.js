import { sagas as articleSagas } from './articles';
import { takeEvery, takeLatest, fork, all } from 'redux-saga/effects';


const allSagas = [
  ...articleSagas
]


// start all sagas in parallel
export default function* rootSaga() {
  yield all(allSagas.map((saga) => fork(saga)));
}