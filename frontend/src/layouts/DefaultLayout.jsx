import React, { useState } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Footer from "../components/layout/Footer/Footer";

const DefaultLayout = ({ children }) => {
  const [currentSongPlay, setCurrentSongPlay] = useState(null);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col pb-4">
      {/* Fixed Header */}
      <Header />

      {/* Main Body */}
      <div className="flex flex-1 mt-18 pb-20 overflow-hidden gap-3 px-5">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 ml-2 overflow-y-auto p-6 bg-[#181818] rounded-2xl">
          {children}
        </main>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
