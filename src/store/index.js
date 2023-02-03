import {legacy_createStore as createStore, combineReducers} from 'redux';
import newsReducer from './reducers/newsReducer';

const rootReducer = combineReducers({
  news: newsReducer,
});

const store = createStore(rootReducer);

export default store;
