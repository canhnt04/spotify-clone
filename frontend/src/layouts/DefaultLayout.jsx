import React, { useState } from "react";
import Header from "../components/layout/Header/Header";
import Leftbar from "../components/layout/Leftbar/Leftbar";
import Footer from "../components/layout/Footer/Footer";
import Rightbar from "../components/layout/Rightbar/Rightbar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col pb-4">
      {/* Fixed Header */}
      <Header />

      {/* Main Body */}
      <div className="flex flex-1 mt-18 pb-20 overflow-hidden gap-3 px-5">
        {/* Leftbar */}
        <Leftbar />

        {/* Content */}
        <main className="flex-1 ml-2 overflow-y-auto p-6 bg-[#181818] rounded-2xl">
          {children}
        </main>

        {/* Rightbar */}
        <Rightbar />
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
