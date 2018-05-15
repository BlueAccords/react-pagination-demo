# Design

## ComponentDidMount
On page load, we need to fetch the new items
starting in the `componentDidMount()` lifecycle method
- dispatch ACTION to fetch items
  - fetchItems ACTION
    - check if current page's items are cached or not
      - TRUE
        - exit action, set current page/current items from cache
      - FALSE
        - dispatch IS_LOADING: true
        - dispatch ACTION to fetch new items from server
    - after items retrieved, dispatch FETCH_SUCCESS action with new items
      - cache new items
      - update normalized list
      - update cache
      - dispatch IS_LOADING: false
    - OR
    - server api call failed, dispatch FETCH_FAILURE action with error