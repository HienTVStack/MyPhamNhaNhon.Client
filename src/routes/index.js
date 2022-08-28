import { useRoutes } from "react-router-dom";
import AppLayout from "../layouts/App/AppLayout";
import Home from "../pages/Home";

const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <AppLayout />,
            children: [{ path: "/", element: <Home /> }],
        },
    ]);
};

export default Router;
