import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../contexts/StoreProvider";

const RouteWrapper = ({ children, isPrivate }) => {
  const { userInfo } = useContext(StoreContext);
  console.log("userInfo :", userInfo);

  let isLogin = false;

  const id = localStorage.getItem("userId");

  if (userInfo && userInfo?.id === id) {
    isLogin = true;
  }

  const currentPath = window.location.pathname;

  // Nếu là private route mà không có token thì redirect đến login
  if (isPrivate && !isLogin) {
    return <Navigate to="/login" replace />;
  }

  // Chỉ chặn vào các trang như /login, /signin nếu đã login
  const authPages = ["/login", "/signin"];
  if (authPages.includes(currentPath) && isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteWrapper;
