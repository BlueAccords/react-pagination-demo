import * as types from './types';

export const articlesFetchRequest = function(payload) {
  return {
    type: types.ARTICLES_FETCH_REQUEST,
    payload
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

export const articlesClearPageCache = function() {
    return {
      type: types.ARTICLES_CLEAR_PAGE_CACHE
    }
}

// this action does the same thing as fetchRequest, but adds a debounce of 2 seconds
// to account for the user typing
export const articlesFilterRequest = function(payload) {
  return {
    type: types.ARTICLES_FILTER_REQUEST,
    payload
  }
}