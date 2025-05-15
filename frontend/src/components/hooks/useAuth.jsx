import { useCallback, useContext } from "react";
import { getListUser, banUser, unBanUser } from "../../apis/authService";
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

  const ban = useCallback(async (id) => {
    try {
      const res = await banUser(id);
      if (res?.data && res?.status === 200) {
        return {
          message: res?.data?.message,
          status: true,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  const unBan = useCallback(async (id) => {
    try {
      const res = await unBanUser(id);
      if (res?.data && res?.status === 200) {
        return {
          message: res?.data?.message,
          status: true,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return { getListUsers, ban, unBan };
};
