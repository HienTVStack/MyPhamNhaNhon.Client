import { useRoutes } from "react-router-dom";
import AppLayout from "../layouts/App/AppLayout";
import BlogDetail from "../pages/Blog/BlogDetail";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import ConfirmEmail from "../pages/Signup/ConfirmEmail";
import CheckEmail from "../pages/ForgotPassword/CheckEmail";
import ForgotPassword from "../pages/ForgotPassword";
import Payment from "../pages/Payment";
import Account from "../pages/Account";

const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/dang-nhap", element: <Login /> },
                { path: "/dang-ky", element: <Signup /> },
                { path: "/xac-nhan-email", element: <ConfirmEmail /> },
                { path: "/quen-mat-khau", element: <CheckEmail /> },
                { path: "/thay-doi-mat-khau", element: <ForgotPassword /> },
                { path: "/san-pham", element: <Product /> },
                { path: "/san-pham/:slug/chi-tiet", element: <ProductDetail /> },
                { path: "/san-pham/:slug", element: <Category /> },
                { path: "/bai-viet", element: <Blog /> },
                { path: "/bai-viet/:slug", element: <BlogDetail /> },
                { path: "/gio-hang", element: <Cart /> },
                { path: "/thanh-toan", element: <Payment /> },
                { path: "/tai-khoan", element: <Account /> },
            ],
        },
        // {
        //     path: "*",
        //     element: <Navigate to="/404" />,
        // },
    ]);
};

export default Router;
