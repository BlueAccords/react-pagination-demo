import { delay } from 'redux-saga'
import { put, takeLatest, takeEvery, all, call, fork, select} from 'redux-saga/effects'
// import { push } from 'react-router-redux';

import * as actions from './actions';
import * as types from './types';
import * as selectors from './selectors'
import api from './api';

/**
 * watchArticleSetSortKeyRequest
 * watchArticleSetSortDirectionRequest
 * 
 * articlesSortKeyRequest
 *  just dispatch action to set key
 * articlesSortDirectionRequest
 *  just dispatch action to set direction
 * 
 * both then call fetchArticles
 */

export function* watchArticleSetSortKeyRequest() {
  yield takeLatest(types.ARTICLES_SET_SORT_KEY_REQUEST, articleSetSortKey);
}

export function* articleSetSortKey(action) {
  const sortKey = action.payload;
  const currentPage = yield select(selectors.getCurrentPage);
  yield put(actions.articlesSetSortKey(sortKey));
  yield put(actions.articlesClearPageCache()); // clear page cache to set new results
  yield put(actions.articlesFetchRequest(currentPage));
}

export function* watchArticleSetSortDirectionRequest() {
  yield takeLatest(types.ARTICLES_SET_SORT_DIRECTION_REQUEST, articleSetSortDirection);
}

export function* articleSetSortDirection(action) {
  const sortDirection = action.payload;
  const currentPage = yield select(selectors.getCurrentPage);
  yield put(actions.articlesSetSortDirection(sortDirection));
  yield put(actions.articlesClearPageCache()); // clear page cache to set new results
  yield put(actions.articlesFetchRequest(currentPage));
}

export function* watchArticleFetchRequest() {
  yield takeEvery(types.ARTICLES_FETCH_REQUEST, articlesFetch);
}

export function* articlesFetch(action) {
  const { page } = action.payload;
  const sortKey = yield select(selectors.getSortKey);
  const sortDirection = yield select(selectors.getSortDirection);

  try {
    const currentPage = yield select(selectors.getCurrentPage);
    const pageParam = page ? page : currentPage; // get current page from payload or store if not provided
    const isPageCached = yield select(selectors.getIsArticleCached, pageParam);
    yield put(actions.articlesSetCurrentPage(pageParam)); // set current page

    // check is page is already loaded before making api call
    if(!isPageCached) {
      const data = yield call(api.articlesFetch, {
        page,
        sortKey,
        sortDirection
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
  watchArticleSetSortKeyRequest,
  watchArticleSetSortDirectionRequest,
];



