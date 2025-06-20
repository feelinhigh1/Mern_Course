import React from "react";
import withAuth from "@/hoc/withAuth";
const index = () => {
  return <div>Products Page</div>;
};

export default withAuth(index);
