const initialState = {
    user: {},
    categories: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                user: action.payload,
            };
        }
        case "LOAD_CATEGORY": {
            return {
                ...state,
                categories: action.payload,
            };
        }
        default:
            return state;
    }
};

export default appReducer;
