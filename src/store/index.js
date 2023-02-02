import { legacy_createStore as createStore, combineReducers } from "redux";
import newsReducer from "./reducers/newsReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    news: newsReducer,
});

const store = createStore(rootReducer);

export default store;
