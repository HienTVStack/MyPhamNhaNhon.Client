import { useRoutes } from "react-router-dom";
import AppLayout from "../layouts/App/AppLayout";
import Home from "../pages/Home";
import Product from "../pages/Product";

const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/san-pham/:slug", element: <Product /> },
            ],
        },
    ]);
};

export default Router;
