import * as types from './types';
import { combineReducers } from 'redux';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.ARTICLES_FETCH_REQUEST:
      return true;
    case types.ARTICLES_FETCH_SUCCESS:
      return false;
    case types.ARTICLES_FETCH_FAILURE:
      return false;
    case types.ARTICLES_FETCH_EXIT: // used to prematurely exit fetch if articles are already cached
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

const currentPage = (state = 0, action) => {
  switch(action.type) {
    case types.ARTICLES_SET_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
}

const lastPage = (state = 0, action) => {
  switch(action.type) {
    case types.ARTICLES_FETCH_SUCCESS:
      return action.payload.lastPage
    default:
      return state;
  }
}

const pages = (state = {}, action) => {
  switch(action.type) {
    case types.ARTICLES_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.currentPage]: action.payload.data.map((item) => item.id)
      }
    case types.ARTICLES_CLEAR_PAGE_CACHE:
      return {}
    default:
      return state;
  }
}

const sort = (state = {
  sortKey: 'id',
  sortDirection: 'ASC'
}, action) => {
  switch(action.type) {
    case types.ARTICLES_SET_SORT_KEY:
      return {
        ...state,
        sortKey: action.payload
      }
    case types.ARTICLES_SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload
      }
    default:
      return state;
  }
}


export default combineReducers({
  error,
  isLoading,
  byId,
  allIds,
  currentPage,
  lastPage,
  pages,
  sort
});