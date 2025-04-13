import { Navigate } from "react-router-dom";

const RouteWrapper = ({ children, isPrivate }) => {
  const token = localStorage.getItem("authToken");
  const currentPath = window.location.pathname;

  // Nếu là private route mà không có token → redirect đến login
  if (isPrivate && !token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Chỉ chặn vào các trang như /login, /signin nếu đã login
  const authPages = ["/login", "/signin"];
  if (authPages.includes(currentPath) && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteWrapper;
