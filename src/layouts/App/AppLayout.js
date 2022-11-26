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
        const isToken = localStorage.getItem("token");
        // setLoading(true);
        if (isToken) {
            // console.log(token);
            const user = await authUtil.isAuthenticated();
            if (Object.entries(user).length !== 0) {
                dispatch(setUser(user));
            }
        }
        // setLoading(false);
    };

    const WebsiteLoaded = async () => {
        setLoading(true);
        try {
            const productLoaded = productApi.getAll();
            const categoryLoaded = categoryApi.getAll();
            const blogLoaded = blogApi.getAll();

            await Promise.all([productLoaded, categoryLoaded, blogLoaded])
                .then((value) => {
                    dispatch(productListLoaded(value[0].products));
                    dispatch(getCategories(value[1].categories));
                    dispatch(blogListLoaded(value[2].blogs));
                })
                .catch((err) => console.log(err));

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
        if (categories?.length === 0 || productList?.length === 0 || blogList?.length === 0) {
            WebsiteLoaded();
        }
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
