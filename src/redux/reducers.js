const initialState = {
    user: {},
    categories: [],
    productList: [],
    blogList: [],
    productPayment: [],
    settings: {},
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
        case "PRODUCT_LOADED": {
            return {
                ...state,
                productList: action.payload,
            };
        }
        case "BLOG_LOADED": {
            return {
                ...state,
                blogList: action.payload,
            };
        }
        case "SET_PRODUCT_PAYMENT": {
            return {
                ...state,
                productPayment: action.payload,
            };
        }
        case "SET_SETTING": {
            return {
                ...state,
                settings: action.payload,
            };
        }
        default:
            return state;
    }
};

export default appReducer;
