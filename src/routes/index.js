import { Navigate, useRoutes } from "react-router-dom";
import AppLayout from "../layouts/App/AppLayout";
import Dashboard from "../layouts/dashboard";
import BlogDetail from "../pages/Blog/BlogDetail";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import HomeDashboard from "../pages/@dashboard/Home";

const Router = () => {
    return useRoutes([
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: [{ path: "app", element: <HomeDashboard /> }],
        },
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/dang-nhap", element: <Login /> },
                { path: "/dang-ky", element: <Signup /> },
                { path: "/san-pham", element: <Product /> },
                { path: "/san-pham/:slug", element: <ProductDetail /> },
                { path: "/san-pham/the-loai/:slug", element: <Category /> },
                { path: "/bai-viet", element: <Blog /> },
                { path: "/bai-viet/:slug", element: <BlogDetail /> },
                { path: "/gio-hang", element: <Cart /> },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/404" />,
        },

        // {
        //     path: "admin",
        //     element: <Dashboard />,
        //     children: [{ path: "/home", element: <HomeDashboard /> }],
        // },
    ]);
};

export default Router;
