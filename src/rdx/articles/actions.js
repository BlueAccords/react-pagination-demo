import * as types from './types';

export const articlesFetchRequest = function(page) {
  return {
    type: types.ARTICLES_FETCH_REQUEST,
    payload: page
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