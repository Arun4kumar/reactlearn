import React from "react";

const Loader = () => {
  return (
    <div
      className="spinner-border loader align-center"
      style={{ width: "3rem", height: "3rem", color: "white" }}
      role="status"
    >
      <span className="ml-50 sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
