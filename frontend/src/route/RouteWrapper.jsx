import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../contexts/StoreProvider";

const RouteWrapper = ({ children, isPrivate }) => {
  const { userInfo } = useContext(StoreContext);

  let isLogin = false;

  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  if (userInfo && userInfo?.id === id) {
    isLogin = true;
  }

  const currentPath = window.location.pathname;

  console.log("currentPath :", currentPath);

  // Nếu là private route mà không có token thì redirect đến login
  if (isPrivate && !isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin" && userInfo?.id === id && currentPath !== "/admin") {
    return <Navigate to="/admin" replace />;
  }

  // Chỉ chặn vào các trang như /login, /signin nếu đã login
  const authPages = ["/login", "/signin"];
  if (authPages.includes(currentPath) && isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteWrapper;
