import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <HashLoader color="#660000" size={100} />
    </div>
  );
};

export default Spinner;
