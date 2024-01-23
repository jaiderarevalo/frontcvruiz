import { FunctionComponent } from "react";
import Pageadmin from "../pages/page-admin/Pageadmin";
import LayoutPublic from "../layouts/Layout.public";
import LayoutPrivate from "../layouts/Layout.private";
import Pageuser from "../pages/page.user/pageuser";
import FormLogin from "../pages/all-pages/FormLogin";

interface RouteBaseType {
  path: string;
  element: FunctionComponent<any>;
  exact?: boolean;
  protected?: boolean;
}

interface RouteType extends RouteBaseType {
  children?: RouteBaseType[];
}

export const routesDashboard: RouteType[] = [
  {
    path: "",
    element: LayoutPublic,
    children: [
      {
        path: "/",
        element: Pageuser,
      }, {
        path: "/login",
        element:FormLogin,
      },
    ],
  },
  {
    path: "dashboard",
    element: LayoutPrivate,
    protected: true,
    children: [
      {
        path: "admin",
        element: Pageadmin,
        exact: true,
      }
    ],
  },
];