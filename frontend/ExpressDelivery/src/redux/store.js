import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthUserReducer } from "./AuthUser/AuthUserReducer";

const rootReducer = combineReducers({
  currentUser: AuthUserReducer,
});

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(logger, thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
