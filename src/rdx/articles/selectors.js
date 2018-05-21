// SELECTORS
import { createSelector } from 'reselect';


// INPUT SELECTORS
export const getCurrentPage = (state) => state.articles.currentPage;
export const getIsArticleCached = (state, page) => state.articles.pages[page] !== undefined;
const getArticlesById = (state) => state.articles.byId;
const getArticlesAllIds = (state) => state.articles.allIds;
const getArticleIdsByPage = state => {
  const page = state.articles.currentPage;
  const pageIds = state.articles.pages[page];

  // check if page ids are already cached or not
  if (pageIds === undefined) {
    return [];
  } else {
    return pageIds
  }
}

// SELECTORS
// get all artices by mapping the array of only ids to the object containing
// all articles by their key
export const getAllArticles = createSelector(
  [getArticlesById, getArticlesAllIds],
  (articlesById, articlesAllIds) => {
    return articlesAllIds.map((allIdsKey) => articlesById[allIdsKey]);
  }
)

export const getAllArticlesOfCurrentPage = createSelector(
  [getArticlesById, getArticleIdsByPage],
  (aById, aIdsByPage) => {
    return aIdsByPage.map((pageIdKey) => aById[pageIdKey]);
  }
)