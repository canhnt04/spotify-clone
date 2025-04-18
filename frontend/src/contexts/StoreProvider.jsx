import { createContext } from "react";

export const StoreContext = createContext();

const StoreProvider = ({ childrend }) => {
  return <StoreContext.Provider>{childrend}</StoreContext.Provider>;
};

export default StoreProvider;
