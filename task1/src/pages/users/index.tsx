import User from "@/components/User/User";
import React from "react";
import withAuth from "@/hoc/withAuth";

const index = () => {
  return (
    <>
      <User />
    </>
  );
};

export default withAuth(index);
