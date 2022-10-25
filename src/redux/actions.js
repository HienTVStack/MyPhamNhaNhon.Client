export const setUser = (token) => ({
    type: "SET_USER",
    payload: token,
});

export const getCategories = (data) => ({
    type: "LOAD_CATEGORY",
    payload: data,
});
