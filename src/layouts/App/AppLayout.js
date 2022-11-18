// React
import { useEffect, useState } from "react";
// React-router-dom
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// Material UI
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
// React-redux
import { useDispatch, useSelector } from "react-redux";
// Components
import Loading from "../../components/Loading";
import AppBarHeader from "../components/AppBarHeader";
import Header from "../components/Header";
import NavbarButtonDesktop from "../components/NavbarButtonDesktop";
//
import { blogListLoaded, getCategories, productListLoaded, setUser } from "../../redux/actions";
// Utils
import authUtil from "../../utils/authUtil";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import blogApi from "../../api/blogApi";
// -----------------------------------------

function AppLayout() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);
    const categories = useSelector((state) => state.data.categories || []);
    const productList = useSelector((state) => state.data.productList || []);
    const blogList = useSelector((state) => state.data.blogList || []);
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("login");

    const checkAuth = async () => {
        if (token) {
            localStorage.setItem("token", token);
        }
        const user = await authUtil.isAuthenticated();
        dispatch(setUser(user));
    };

    const WebsiteLoaded = async () => {
        setLoading(true);
        try {
            const productLoaded = await productApi.getAll();
            const categoryLoaded = await categoryApi.getAll();
            const blogLoaded = await blogApi.getAll();
            if (productLoaded.success) {
                dispatch(productListLoaded(productLoaded.products));
            }
            if (categoryLoaded.message === "OK") {
                dispatch(getCategories(categoryLoaded.categories));
            }
            if (blogLoaded.success) {
                dispatch(blogListLoaded(blogLoaded.blogs));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // const categoryLoaded = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await categoryApi.getAll();
    //         if (res.message === "OK") {
    //             dispatch(getCategories(res.categories));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    // const productLoaded = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await productApi.getAll();
    //         if (res const res = await blogApi.getAll();
    // if (res.success) {
    //     dispatch(blogListLoaded(res.blogs));
    // }.success) {
    //             dispatch(productListLoaded(res.products));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    // const blogLoaded = async () => {
    //     setLoading(true);
    //     try {
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    useEffect(() => {
        // if (Object.entries(user).length === 0) {
        checkAuth();
        if (categories?.length === 0 || productList?.length === 0 || blogList?.length === 0) {
            WebsiteLoaded();
        }
        // }
        // if (categories.length === 0) {
        //     categoryLoaded();
        // }
        // if (productList.length === 0) {
        //     productLoaded();
        // }
        // if (blogList.length === 0) {
        //     blogLoaded();
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return loading ? (
        <Loading fullHeight />
    ) : (
        <Box>
            <AppBarHeader />
            <Header />
            <NavbarButtonDesktop />
            <Box mt={matches ? "120px" : "184px"}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppLayout;
