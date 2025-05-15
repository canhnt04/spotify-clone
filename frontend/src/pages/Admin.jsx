import SimpleBar from "simplebar-react";
import ReactPaginate from "react-paginate";
import Search from "../components/ui/Search/Search";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreProvider";
import { useAuth } from "../components/hooks/useAuth";
import Tippy from "@tippyjs/react";

import { ArrowLeft, ArrowRight, Lock, Unlock } from "lucide-react";
import usePagination from "../components/hooks/usePagination";
import { ToastContext } from "../contexts/ToastContext";
import { useDebounce } from "../components/hooks/useDebounce";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { getListUsers, ban, unBan } = useAuth();
  const { defaulAvatar } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredUsers =
    debouncedSearchTerm.trim() === ""
      ? users
      : users.filter((user) =>
          `${user.full_name} ${user.email} ${user.username}`
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        );

  const {
    currentData: currentUsers,
    pageCount,
    setCurrentPage,
    handlePageChange,
  } = usePagination(filteredUsers, 5);

  const fetchListUsers = async () => {
    setIsLoading(true);
    const res = await getListUsers();
    if (res) {
      setIsLoading(false);
      setUsers(res);
    }
  };

  const handleAction = async (user) => {
    let res;

    if (user?.is_active) {
      res = await ban(user?.id);
    } else {
      res = await unBan(user?.id);
    }

    if (res) {
      const { message } = res;
      toast.success(message);

      // Cập nhật lại user trong danh sách
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, is_active: !u.is_active } : u
        )
      );
    } else {
      toast.error("Lỗi khi thực hiện hành động này");
    }
  };
  // Reset về page 0 mỗi khi search kết quả thay đổi
  useEffect(() => {
    fetchListUsers();
  }, []);
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm]);
  return (
    <div className="">
      {/* Header */}
      <header className="h-15 m-4 rounded-xl">
        <div className="flex items-center justify-between h-full px-2">
          <div>
            <span className="text-lg">
              All users{" "}
              <span className="text-gray-300 font-extrabold">
                {users?.length}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 rounded-md bg-primary text-white focus:outline-none"
              autoComplete="off"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 h-[calc(90vh-150px)] m-4 overflow-hidden">
        <SimpleBar
          style={{
            height: 450,
            padding: "0",
          }}
        >
          <table className="min-w-full bg-primary border border-gray-600 rounded-lg">
            <thead>
              <tr className="text-left text-sm font-semibold text-white">
                <th className="p-4">Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Username</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user?.id} className="border-t border-gray-600">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={user?.avatar || defaulAvatar}
                      alt={user?.full_name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-sm">
                      {user?.full_name}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white">{user?.email}</td>
                  <td className="p-4 font-medium">{user?.username}</td>
                  <td className="p-4">
                    {user?.is_active ? (
                      <span className="text-green-600 bg-green-100 px-4 py-1 text-sm rounded-sm font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-100 px-4 py-1 text-sm rounded-sm font-bold">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Tippy
                      content={user?.is_active ? "Deactivate" : "Activate"}
                    >
                      <button
                        onClick={() => handleAction(user)}
                        className="p-2 rounded-full hover:bg-secondary hover:scale-102 hover:text-red-400 hover:font-bold transition-all"
                      >
                        {user?.is_active ? (
                          <Lock size={18} />
                        ) : (
                          <Unlock size={18} />
                        )}
                      </button>
                    </Tippy>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleBar>
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={<ArrowLeft size={20} />}
            nextLabel={<ArrowRight size={20} />}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center mt-4 space-x-3"}
            pageClassName={
              "px-3 py-1 rounded border text-white font-bold transition-all cursor-pointer"
            }
            activeClassName={
              "bg-green-500 text-white font-bold transition-all cursor-pointer"
            }
            previousClassName={
              "flex items-center justify-center px-3 py-1 rounded bg-transparent border cursor-pointer tranisition-all hover:scale-102"
            }
            nextClassName={
              "flex items-center justify-center px-3 py-1 rounded bg-transparent border cursor-pointer tranisition-all hover:scale-102"
            }
            breakLabel={"..."}
          />
        </div>
      </main>
    </div>
  );
};

export default Admin;
