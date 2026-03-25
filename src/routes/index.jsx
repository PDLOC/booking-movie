import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
    {
        path: "",
        element: lazy(() => import("./../pages/HomeTemplate")),
        nested: [
            {
                path: "",
                element: lazy(() => import("./../pages/HomeTemplate/Home")),
            },
            {
                path: "about",
                element: lazy(() => import("./../pages/HomeTemplate/About")),
            },
            {
                path: "list-movie",
                element: lazy(() => import("./../pages/HomeTemplate/ListMovie")),
            },
            {
                path: "login",
                element: lazy(() => import("./../pages/HomeTemplate/Login")),
            },
            {
                path: "detail/:id",
                element: lazy(() => import("./../pages/HomeTemplate/Detail")),
            },
            {
                path: "ticket/:id",
                element: lazy(() => import("./../pages/HomeTemplate/ListSeat")),
            },
        ],
    },
    {
        path: "admin",
        element: lazy(() => import("./../pages/AdminTemplate")),
        nested: [
            {
                path: "dashboard",
                element: lazy(() => import("./../pages/AdminTemplate/Dashboard")),
            },
            {
                path: "add-user",
                element: lazy(() => import("./../pages/AdminTemplate/AddUser")),
            },

        ],
    },

    {
        path: "auth",
        element: lazy(() => import("./../pages/AdminTemplate/Auth")),
    },

    {
        path: "another",
        element: lazy(() => import("./../pages/Another")),
    },
    {
        path: "*",
        element: lazy(() => import("./../pages/PageNotFount")),
    },
];

export const renderRoutes = () => {
    return routes.map((route) => {
        if (route.nested) {
            // HomeTemplate, AdminTemplate
            return (
                <Route key={route.path} path={route.path} element={<route.element />}>
                    {route.nested.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.element />}
                        />
                    ))}
                </Route>
            );
        } else {
            return (
                <Route key={route.path} path={route.path} element={<route.element />} />
            );
        }
    });
};