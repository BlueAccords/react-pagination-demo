import { createStore, applyMiddleware, compose } from "redux";
// import reducer from "./reducers/index";

// const store = createStore(rootReducer);

import createSagaMiddleware from 'redux-saga';
import reducer from './rootReducer';

// used to make redux saga calls that can return promises
import { middleware as thunkMiddleware } from 'redux-saga-thunk' 
import rootSaga from './rootSaga';

// saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
    )
  )
);

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
//   // replace with composeEnhancers later if using middlware
// );
 

sagaMiddleware.run(rootSaga);

export default store;
