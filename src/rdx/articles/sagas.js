import { delay } from 'redux-saga';
import { put, takeLatest, takeEvery, all, call, fork, select} from 'redux-saga/effects'
// import { push } from 'react-router-redux';

import * as actions from './actions';
import * as types from './types';
import * as selectors from './selectors'
import api from './api';

const FILTER_DEBOUNCE_DELAY = 1000;


export function* watchArticleFilterRequest() {
  yield takeLatest(types.ARTICLES_FILTER_REQUEST, handleFilterRequest);
}

export function* handleFilterRequest(action) {
  yield delay(FILTER_DEBOUNCE_DELAY);
  yield put(actions.articlesFetchRequest(action.payload));
}

export function* watchArticleFetchRequest() {
  yield takeLatest(types.ARTICLES_FETCH_REQUEST, articlesFetch);
}

export function* articlesFetch(action) {
  const { page, sortKey, sortDirection, clearCache=false, searchFilter=null } = action.payload;

  try {
    if(clearCache) {
      yield put(actions.articlesClearPageCache()); // clear page cache to set new results
    }
    const currentPage = yield select(selectors.getCurrentPage);
    const pageParam = page ? page : currentPage; // get current page from payload or store if not provided
    const isPageCached = yield select(selectors.getIsArticleCached, pageParam);
    yield put(actions.articlesSetCurrentPage(pageParam)); // set current page


    // check is page is already loaded before making api call
    if(!isPageCached || clearCache) {
      // TODO: check is page is cached on sort/filter
      const data = yield call(api.articlesFetch, {
        page: pageParam,
        sortKey,
        sortDirection,
        searchFilter
      });
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
  watchArticleFilterRequest
];



