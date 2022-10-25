import { combineReducers } from "redux";

import appReducer from "./reducers";

const rootReducer = combineReducers({
    data: appReducer,
});

export default rootReducer;
