import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useContext, useState } from "react";
import { register } from "../apis/AuthService";
import { ToastContext } from "../contexts/ToastContext";
import MyModal from "../components/ui/MyModal/MyModal";
import ScaleLoader from "react-spinners/ScaleLoader";
const Signin = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      const res = await register({
        username,
        email,
        password,
      });

      const resData = res?.data;

      if (resData?.status === 201) {
        toast.success(resData.message);
        setIsLoading(false);
        setTimeout(() => navigate("/login"), 1500);
        setErrorMessage((prev) => ({
          ...prev,
          username: "",
          email: "",
          password: "",
        }));
      }
    } catch (error) {
      setIsLoading(false);

      const resData = error.response?.data;

      const errors = resData?.errors || {};

      setErrorMessage((prev) => ({
        ...prev,
        username: errors.username?.[0] || "",
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      }));

      if (!errors.username && !errors.email && !errors.password) {
        toast.error(
          resData?.message || "Đăng ký thất bại. Kiểm tra lại thông tin."
        );
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen flex items-center justify-center">
      <MyModal isLoading open={isLoading}>
        <div className="flex justify-center">
          <ScaleLoader
            color={"#fff"}
            loading={true}
            height={60}
            radius={20}
            width={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </MyModal>
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
            {errorMessage.username && (
              <p className="text-xs text-red-600 font-normal my-2">
                {errorMessage.username}
              </p>
            )}

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
            {errorMessage.email && (
              <p className="text-xs text-red-600 font-normal my-2">
                {errorMessage.email}
              </p>
            )}
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
            {errorMessage.password && (
              <p className="text-xs text-red-600 font-normal my-2">
                {errorMessage.password}
              </p>
            )}

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
