import Button from "../components/ui/Button/Button";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen flex items-center justify-center">
      <div className="bg-zinc-950 p-10 rounded-lg w-full max-w-md text-white">
        <div class="flex flex-col items-center mb-6">
          <img src={logo} alt="Spotify" class="w-12 h-12 mb-4 rounded-full" />
          <h2 class="text-2xl font-bold">Đăng nhập vào Spotify</h2>
        </div>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-1">
              Email hoặc tên người dùng
            </label>
            <input
              required
              type="text"
              class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              placeholder="Email hoặc tên người dùng"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Mật khẩu</label>
            <input
              required
              type="password"
              class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              placeholder="Mật khẩu"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-green-500 text-black font-semibold py-2 rounded-full hover:bg-green-400 transition"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm font-bold text-white">
            Bạn chưa có tài khoản{" "}
            <Link
              to={"/signin"}
              className="text-green-500 font-bold text-sm underline"
            >
              Đăng ký
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
