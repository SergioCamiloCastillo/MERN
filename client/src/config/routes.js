//layout
import React from "react";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin pages

import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";

//Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//Other 404
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    exact: false,

    component: LayoutAdmin,
    routes: [
      {
        path: "/admin",
        exact: true,

        component: AdminHome,
      },
      {
        path: "/admin/login",
        exact: true,

        component: AdminSignIn,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },{
        component:Error404
      }
    ],
  },
];
export default routes;
