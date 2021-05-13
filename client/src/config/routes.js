//layout
import React from "react";
import LayoutAdmin from "../layouts/LayoutAdmin.jsx";
import LayoutBasic from "../layouts/LayoutBasic.jsx";

//Admin pages

import AdminHome from "../pages/Admin/";
import AdminSignIn from "../pages/Admin/SignIn/";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminCourses from "../pages/Admin/Courses.jsx";

//Pages
import Home from "../pages/Home.jsx";
import Contact from "../pages/Contact.jsx";
import Courses from "../pages/Courses.jsx";

//Other 404
import Error404 from "../pages/Error404.jsx";

const routes = [{
    path: "/admin",
    exact: false,

    component: LayoutAdmin,
    routes: [{
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
        path: "/admin/users",
        exact: true,

        component: AdminUsers,
      },
      {
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true
      },
      {
        path: "/admin/courses",
        component: AdminCourses,
        exact: true
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
    routes: [{
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        path: "/courses",
        component: Courses,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];
export default routes;