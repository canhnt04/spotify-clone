import logo from "../../../assets/images/logo.jpg";
import Button from "../../ui/Button/Button";

const HeaderAdmin = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    window.location.reload();
  };
  return (
    <header className="fixed top-0 left-0 right-0  bg-black text-white h-[64px] px-4 py-2 flex items-center justify-between shadow-md">
      {/* Left: Logo + Home + Search */}
      <div className="flex items-center gap-4 h-full">
        <a
          href="https://localhost:5173/"
          className="h-full w-[48px] flex items-center justify-center rounded-full"
        >
          <img src={logo} alt="Spotify" className="w-8 h-8 rounded-full" />
        </a>
      </div>

      {/* Right: Menu */}
      <div className="flex items-center gap-6 text-sm font-semibold">
        <nav className="flex items-center gap-4 text-gray-300">
          <a href="#" className="hover:text-white flex items-center gap-1">
            {" "}
            Hello Admin
          </a>
          <Button onClick={handleLogout}>Logout</Button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAdmin;
