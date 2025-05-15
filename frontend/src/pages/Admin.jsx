import SimpleBar from "simplebar-react";
import ReactPaginate from "react-paginate";
import Search from "../components/ui/Search/Search";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreProvider";
import { useAuth } from "../components/hooks/useAuth";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import usePagination from "../components/hooks/usePagination";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { getListUsers } = useAuth();
  const { defaulAvatar } = useContext(StoreContext);

  const {
    currentData: currentUsers,
    pageCount,
    handlePageChange,
  } = usePagination(users, 10);

  const fetchListUsers = async () => {
    setIsLoading(true);
    const res = await getListUsers();
    if (res) {
      setIsLoading(false);
      setUsers(res);
    }
  };

  useEffect(() => {
    fetchListUsers();
  }, []);
  return (
    <div className="">
      {/* Header */}
      <header className="h-15 m-4 rounded-xl">
        <div className="flex items-center justify-between h-full px-2">
          <span className="text-lg">
            All users{" "}
            <span className="text-gray-300 font-extrabold">
              {users?.length}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <Search />
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
              <tr className="bg-primary text-left text-sm font-semibold text-white">
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
                  <td className="p-2 flex items-center gap-3">
                    <img
                      src={user?.avatar || defaulAvatar}
                      alt={user?.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{user?.full_name}</span>
                  </td>
                  <td className="p-4 text-sm text-white">{user?.email}</td>
                  <td className="p-4 font-semibold">{user?.username}</td>
                  <td className="p-4">
                    {user?.is_active ? (
                      <span className="text-red-600 bg-red-100 px-4 py-1 text-sm rounded-sm font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-100 px-4 py-1 text-sm rounded-sm font-bold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleBar>
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center mt-6 space-x-2"}
            pageClassName={"px-3 py-1 rounded bg-gray-200 text-gray-700"}
            activeClassName={"bg-green-500 text-white"}
            previousClassName={"px-3 py-1 rounded bg-gray-300"}
            nextClassName={"px-3 py-1 rounded bg-gray-300"}
            breakLabel={"..."}
          />
        </div>
      </main>
    </div>
  );
};

export default Admin;
