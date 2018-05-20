import * as types from './types';

export const articlesFetchRequest = function(page) {
  return {
    type: types.ARTICLES_FETCH_REQUEST,
    payload: {
      page
    }
  }
}

export const articlesFetchSuccess = function(payload) {
  return {
    type: types.ARTICLES_FETCH_SUCCESS,
    payload: payload
  }
}

export const articlesFetchFailure = function(error) {
  return {
    type: types.ARTICLES_FETCH_FAILURE,
    payload: error
  }
}

export const articlesFetchExit = function() {
  return {
    type: types.ARTICLES_FETCH_EXIT,
  }
}

export const articlesSetCurrentPage = function(page) {
  return {
    type: types.ARTICLES_SET_CURRENT_PAGE,
    payload: page
  }
}

export const articlesSetSortKeyRequest = function(payload) {
  return {
    type: types.ARTICLES_SET_SORT_KEY_REQUEST,
    payload
  }
}

export const articlesSetSortKey = function(payload) {
  return {
    type: types.ARTICLES_SET_SORT_KEY,
    payload
  }
}

export const articlesSetSortDirectionRequest = function(payload) {
  return {
    type: types.ARTICLES_SET_SORT_DIRECTION_REQUEST,
    payload
  }
}

export const articlesSetSortDirection = function(payload) {
  return {
    type: types.ARTICLES_SET_SORT_DIRECTION,
    payload
  }
}

export const articlesClearPageCache = function() {
    return {
      type: types.ARTICLES_CLEAR_PAGE_CACHE
    }
}