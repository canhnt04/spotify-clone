import { useCallback, useContext } from "react";
import { getListUser } from "../../apis/authService";
import { StoreContext } from "../../contexts/StoreProvider";

export const useAuth = () => {
  const { userInfo } = useContext(StoreContext);
  const getListUsers = useCallback(async () => {
    try {
      const res = await getListUser();
      if (res?.data && res?.data.users) {
        return res.data.users?.filter((user) => user?.id !== userInfo?.id);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return { getListUsers };
};
