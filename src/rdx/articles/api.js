import axios from 'axios';
axios.defaults.withCredentials = true;

// const BASE_URL = '/api/auth/register'
const BASE_URL = 'http://localhost:3000/'
const LIMIT = 25;

const articlesFetch = async (params) => {
  try {
    const { page, sortKey, sortDirection } = params;
    const url = BASE_URL.concat(`articles/?_page=${page}&_limit=${25}&_sort=${sortKey}&_order=${sortDirection}`);
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