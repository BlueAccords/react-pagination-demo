import axios from 'axios';
axios.defaults.withCredentials = true;
import * as helpers from './_helpers';

const BASE_URL = 'http://localhost:3000/'
const LIMIT = 25;

const articlesFetch = async (params) => {
  try {
    const { page, sortKey, sortDirection, searchFilter, optionsFilter } = params;

    const queryString = helpers.concatParams({
      _page: page,
      _limit: LIMIT,
      _sort: sortKey,
      _order: sortDirection,
      q: searchFilter,
      folder_type: optionsFilter
    });

    // const url = BASE_URL.concat(`articles/?_page=${page}&_limit=${25}&_sort=${sortKey}&_order=${sortDirection}`);
    console.log(queryString);
    const url = BASE_URL.concat('articles/', '?', queryString);
    const response = await axios.get(url);
    const totalCount = response.headers['x-total-count'];
    const lastPage = Math.ceil(totalCount / LIMIT);
    // FIXME: the problem is if you make an api call for a page > last page in the api, 
    // the api will just return an empty data set but it will still be a 200 response code.
    return {
      data: response.data,
      lastPage: Math.ceil(totalCount / LIMIT),
      currentPage: page
    }
  } catch(err) {
    console.log(err);
    throw err.response;
  }
}

export default {
  articlesFetch
}