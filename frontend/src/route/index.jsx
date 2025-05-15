import Home from "../pages/Home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import CommingSoon from "../pages/CommingSoon";
import HeaderOnly from "../layouts/HeaderOnly";
import UploadSong from "../pages/UploadSong";
import AlbumDetail from "../pages/AlbumDetail";
import FavoriteSong from "../pages/FavoriteSong";
import VideoDetail from "../pages/VideoDetail";
import Admin from "../pages/Admin";
import AdminLayout from "../layouts/AdminLayout";

export const routes = [
  // public route
  { path: "/", element: Home, isPrivate: false },
  { path: `/album/detail/:id`, element: AlbumDetail, isPrivate: false },
  { path: "/login", element: Login, layout: null, isPrivate: false },
  { path: "/signin", element: Signin, layout: null, isPrivate: false },
  // private route
  { path: "/profile/:id", element: Profile, isPrivate: true },
  { path: "/favorite", element: FavoriteSong, isPrivate: true },
  { path: "/admin", element: Admin, layout: AdminLayout, isPrivate: true },
  {
    path: "/video/:id",
    element: VideoDetail,
    layout: HeaderOnly,
    isPrivate: true,
  },
  {
    path: "/song/upload",
    element: UploadSong,
    layout: HeaderOnly,
    isPrivate: true,
  },
  // exception route
  { path: "/*", element: NotFound, layout: null, isPrivate: false },
];
