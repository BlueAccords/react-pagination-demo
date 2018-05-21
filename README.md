Forked from https://github.com/HydroCarbons/redux-react-boilerplate-2018  

Just a simple demo application to show pagination, sorting, and filtering.

# Instructions
- run `npm install`
- Install [json-server](https://github.com/typicode/json-server) for the backend api. in global npm
- run `json-server ./server/index.js` in a separate terminal tab
- run `npm start` in a seperate terminal tab

## Stack
- React
- Redux
- Redux-Saga
- Axios
- React-Boostrap

## Server
Uses [json-server](https://github.com/typicode/json-server) for the backend api.

## Pagination
- Caches items, per page, in redux store as user changes pages.
- If user changes sorting/filtering option then cache will be cleared

## Sorting
- Done via a `sortKey` and `sortDirection` select input, both inputs are controlled inputs controlled via react local state.
- I tried to do this in the redux store but it just generated a lot of unnecessary boilerplate.

## Filtering
- done via a `searchFilter` inputbox, controlled input via local react component

