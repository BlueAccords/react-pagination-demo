import * as types from './types';
import { combineReducers } from 'redux';

// export const ARTICLES_FETCH_REQUEST = 'ARTICLES_FETCH_REQUEST';
// export const ARTICLES_FETCH_SUCCESS = 'ARTICLES_FETCH_SUCCESS';
// export const ARTICLES_FETCH_FAILURE = 'ARTICLES_FETCH_FAILURE';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.ARTICLES_FETCH_REQUEST:
      return true;
    case types.ARTICLES_FETCH_SUCCESS:
      return false;
    case types.ARTICLES_FETCH_FAILURE:
      return false;
    default:
      return state;
  }
}

const error = (state = null, action) => {
  switch(action.type) {
    case types.ARTICLES_FETCH_REQUEST:
      return null;
    case types.ARTICLES_FETCH_FAILURE:
      return action.payload 
    default:
      return state;
  }
}

// object containing all the items, with article keys as the object properties
const byId  = (state = {}, action) => {
  const articlesList = {};
  switch(action.type) {
    case types.ARTICLES_FETCH_SUCCESS:
      for(let i = 0; i < action.payload.data.length; i++) {
        const articleItem = action.payload.data[i];
        articlesList[articleItem.id] = articleItem;
      }
      return {
        ...state,
        ...articlesList
      }
    default:
      return state;
  }
}

// array of only the item ids
const allIds = (state = [], action) => {
  switch(action.type) {
    case types.ARTICLES_FETCH_SUCCESS:
      return [
        ...state,
        ...action.payload.data.map((item) => {
          return item.id;
        })
      ]
    default:
      return state;
  }
}


export default combineReducers({
  error,
  isLoading,
  byId,
  allIds
});