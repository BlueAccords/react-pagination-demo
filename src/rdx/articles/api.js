import axios from 'axios';
axios.defaults.withCredentials = true;
import * as helpers from './_helpers';

const BASE_URL = 'http://localhost:3000/'
const LIMIT = 25;

const articlesFetch = async (params) => {
  try {
    const { page, sortKey, sortDirection, searchFilter } = params;

    const queryString = helpers.concatParams({
      _page: page,
      _limit: LIMIT,
      _sort: sortKey,
      _order: sortDirection,
      q: searchFilter
    });

    // const url = BASE_URL.concat(`articles/?_page=${page}&_limit=${25}&_sort=${sortKey}&_order=${sortDirection}`);
    const url = BASE_URL.concat('articles/', '?', queryString);
    const response = await axios.get(url);
    const totalCount = response.headers['x-total-count'];
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