import React from "react";
import withAuth from "@/hoc/withAuth";

const index = () => {
  return (
    <>
      <div className="text-xm font-semibold text-gray-800">
        Welcome to the Admin Dashboard 👋
      </div>
    </>
  );
};

export default withAuth(index);
