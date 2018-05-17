# Design


# Folders page
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

## Page Response Schema
Schema of respones returned from successful api call:

```
items: [{
  "id": 0,
  "title": "Ea tenetur natus",
  "description": "Assumenda eum sunt. Praesentium nesciunt molestiae dolores officia totam illum magni. Quidem at veritatis. Aliquid accusamus ratione veritatis ut sed reprehenderit facere.",
  "folder_type": "INCOMPLETE"
}, {},{}, ...],
page: 0,
pageCount: 10
```

- items: array of objects containing the data items
- page: number containing current page
  - Will probably have to get from sent in param.
- pageCount: TOTAL number of pages, also the last page number
  - May have to inspect `X-Total-Count` header and divide by limit to get page count.

## Redux Structure
### Action Types
- RESOURCE_FETCH_REQUEST
- RESOURCE_FETCH_SUCCESS
- RESOURCE_FETCH_FAILURE
- RESOURCE_SET_CURRENT_PAGE
### Actions
- fetchResourcesRequest
- fetchResourcesSuccess
- fetchResourcesFailure
- setCurrentPage

### Reducers
- isLoading : State indicating fetch is in progress or not
  - true
    - called on fetch
  - false
    - called on success AND failure
    - initial state
- byId : stores resource items by their key, key[resource id]: value[resource value properties]
  - {} (empty)
    - initial state
    - clear list when calling NEW sorting/filtering method
  - update list on success
 ``` 
  {
    "1": {
      id: 1,
      name: 'example name',
      category: 'example category'
    },
    ...
  }
  ```
- ids : stores ONLY resource items' ids(or other unique identifiers). Used for cross reference look up tables when necessary. Also used to fetch all items by ids. ALSO, allows reliable way to maintain sort order via ids as iterating over object keys is unreliable in javascript
  - [] (empty)
    - initial state
    - deleted on new sort/filter
  - ['1', '3', '5', '2', ...]
    - filled on fetch success
- error : stores error from fetching, or nothing
  - null
    - initial state
    - set on success/fetch
  - new Error(...)
    - set on fetch error
- currentPage : stores current page as an integer
  - 0
    - initial state
  - 4
    - some number
    - set on setCurrentPage action
- lastPage : stores last page as an integer
  - 0
    - initial state
  - 1
    - some number
    - set on resource fetch success
- pages : an object of page numbers as keys, each sub array contains the ids of the items belonging to that page. This is used to cache pages of the same sort/filter options. If a user returns to a previous page that was already loaded under the same conditions then we will check this array to see if the page exists, and if it does then just load the items with the same ids as the ones contained in the page sub array.
  - []
    - initial state
```
pages = {
  1: [1, 2, 4, 5, 6],
  4: [7, 8, 9, 12, 15],
  ...
}
```

### Selectors
### Sagas