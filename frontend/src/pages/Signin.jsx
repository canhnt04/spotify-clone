import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useContext, useState } from "react";
import { register } from "../apis/AuthService";
import { ToastContext } from "../contexts/ToastContext";

const Signin = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        username,
        email,
        password,
      });
      if (res?.data) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      toast.error("Đăng ký tài khoản thất bại. Vui lòng thử lại.");
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen flex items-center justify-center">
      <div className="bg-zinc-950 p-10 rounded-lg w-full max-w-md text-white">
        <div class="flex flex-col items-center mb-6">
          <img src={logo} alt="Spotify" class="w-12 h-12 mb-4 rounded-full" />
          <h2 class="text-2xl font-bold">Đăng ký tài khoản Spotify</h2>
        </div>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label class="block text-sm font-semibold mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              placeholder="Tên người dùng"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="text"
              class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              placeholder="Email"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Mật khẩu</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              placeholder="Mật khẩu"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
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
            Đăng ký
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm font-bold text-white">
            Bạn đã có tài khoản{" "}
            <Link
              to={"/login"}
              className="text-green-500 font-bold text-sm underline"
            >
              Đăng nhập
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
