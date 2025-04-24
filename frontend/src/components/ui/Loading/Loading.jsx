import React from "react";
import MyModal from "../MyModal/MyModal";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = ({ isOpen }) => {
  return (
    <MyModal isLoading open={isOpen}>
      <div className="flex justify-center">
        <ScaleLoader
          color={"#fff"}
          loading={true}
          height={60}
          radius={20}
          width={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </MyModal>
  );
};

export default Loading;
