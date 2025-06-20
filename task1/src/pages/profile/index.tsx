import React from "react";
import withAuth from "@/hoc/withAuth";
const index = () => {
  return <div>This is the profile page</div>;
};

export default withAuth(index);
