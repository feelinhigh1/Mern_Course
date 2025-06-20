import React from "react";
import withAuth from "@/hoc/withAuth";

const index = () => {
  return <div>Settings Page</div>;
};

export default withAuth(index);
