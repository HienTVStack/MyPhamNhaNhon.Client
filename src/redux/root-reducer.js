import { combineReducers } from "redux";

import appReducer from "./reducers";

const rootReducer = combineReducers({
    user: appReducer,
});

export default rootReducer;
