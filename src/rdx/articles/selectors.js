// SELECTORS
import { createSelector } from 'reselect';


// input selectors
const getArticlesById = (state) => state.articles.byId;
const getArticlesAllIds = (state) => state.articles.allIds;

// selectors

// get all artices by mapping the array of only ids to the object containing
// all articles by their key
export const getAllArticles = createSelector(
  [getArticlesById, getArticlesAllIds],
  (articlesById, articlesAllIds) => {
    // console.log(articlesById);
    // console.log(articlesAllIds);
    return articlesAllIds.map((allIdsKey) => articlesById[allIdsKey]);
  }
)