export const setUser = (token) => ({
    type: "SET_USER",
    payload: token,
});

export const getCategories = (data) => ({
    type: "LOAD_CATEGORY",
    payload: data,
});

export const productListLoaded = (data) => ({
    type: "PRODUCT_LOADED",
    payload: data,
});

export const blogListLoaded = (data) => ({
    type: "BLOG_LOADED",
    payload: data,
});
export const setProductPayment = (data) => ({
    type: "SET_PRODUCT_PAYMENT",
    payload: data,
});
