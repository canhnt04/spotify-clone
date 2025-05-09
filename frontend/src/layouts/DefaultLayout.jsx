import React, { useState } from "react";
import Header from "../components/layout/Header/Header";
import Leftbar from "../components/layout/Leftbar/Leftbar";
import Footer from "../components/layout/Footer/Footer";
import Rightbar from "../components/layout/Rightbar/Rightbar";
import SimpleBar from "simplebar-react";

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
        <main className="flex-1 ml-2 bg-[#181818] rounded-2xl overflow-hidden">
          {/* {children} */}
          <SimpleBar
            style={{
              maxHeight: 500,
              height: "max-content",
              padding: "32px 20px 0px 20px",
            }}
          >
            {children}
          </SimpleBar>
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
