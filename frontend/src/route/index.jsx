import Home from "../pages/Home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Account from "../pages/Account";
import NotFound from "../pages/NotFound";
import CommingSoon from "../pages/CommingSoon";
import HeaderOnly from "../layouts/HeaderOnly";

export const routes = [
  // public route
  { path: "/", element: Home, isPrivate: false },
  { path: "/login", element: Login, layout: null, isPrivate: false },
  { path: "/signin", element: Signin, layout: null, isPrivate: false },
  // private route
  { path: "/account", element: Account, layout: HeaderOnly, isPrivate: true },
  // exception route
  { path: "/*", element: NotFound, layout: null, isPrivate: false },
];
