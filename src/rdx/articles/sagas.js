import { delay } from 'redux-saga'
import { put, takeEvery, all, call, fork } from 'redux-saga/effects'
// import { push } from 'react-router-redux';

import * as actions from './actions';
import * as types from './types';
import api from './api';

export function* watchArticleFetchRequest() {
  yield takeEvery(types.ARTICLES_FETCH_REQUEST, articlesFetch);
}

export function* articlesFetch(action) {
  const { payload } = action;
  try {
    const data = yield call(api.articlesFetch, payload);
    console.log(data);
    yield put(actions.articlesFetchSuccess(data));
  } catch(err) {
    // TODO: better error handling
    console.log(err);
    yield put(actions.articlesFetchFailure(err));
  }
}

// saga to load user session from cookie, if possible
// export function* loadUserSession() {
//   try {
//     const data = yield call(api.getUserFromSession);
//     yield put(actions.sessionLoadSuccess(data));
//   } catch(err) {
//     console.log(err);
//     const data = yield put(actions.sessionLoadFailure(err));
//   }
// }

// export function* executeLoadUserSession() {
//   yield fork(loadUserSession);
// }

// export only watcher sagas in one variable
export const sagas = [
  watchArticleFetchRequest,
];



