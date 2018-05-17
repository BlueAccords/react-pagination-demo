import { delay } from 'redux-saga'
import { put, takeEvery, all, call, fork, select} from 'redux-saga/effects'
// import { push } from 'react-router-redux';

import * as actions from './actions';
import * as types from './types';
import * as selectors from './selectors'
import api from './api';

export function* watchArticleFetchRequest() {
  yield takeEvery(types.ARTICLES_FETCH_REQUEST, articlesFetch);
}

export function* articlesFetch(action) {
  const { payload } = action;
  try {
    yield put(actions.articlesSetCurrentPage(payload)); // set current page

    // check is page is already loaded before making api call
    const isPageCached = yield select(selectors.getIsArticleCached, payload);

    if(!isPageCached) {
      const data = yield call(api.articlesFetch, payload);
      yield put(actions.articlesFetchSuccess(data));
    } else {
      yield put(actions.articlesFetchExit());
    }

  } catch(err) {
    // TODO: better error handling
    console.log(err);
    yield put(actions.articlesFetchFailure(err));
  }
}

// export only watcher sagas in one variable
export const sagas = [
  watchArticleFetchRequest,
];



