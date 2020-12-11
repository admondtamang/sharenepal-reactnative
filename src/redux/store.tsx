import rootReducer from "./rootReducer";
import logger from "redux-logger";

import { applyMiddleware, createStore } from "redux";

const midddleware = [logger];

const store = createStore(rootReducer, applyMiddleware(...midddleware));
export default store;
