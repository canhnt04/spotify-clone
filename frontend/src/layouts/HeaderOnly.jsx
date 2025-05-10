import React from "react";
import Header from "../components/layout/Header/Header";

const HeaderOnly = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col pb-4">
      {/* Fixed Header */}
      <Header />

      {/* Content */}
      <main className="flex-1 overflow-y-auto mt-20 mx-6 bg-[#181818] rounded-2xl">
        {children}
      </main>
    </div>
  );
};

export default HeaderOnly;
