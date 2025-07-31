import React from "react";
import withAuth from "@/hoc/withAuth";
import Post from "@/components/Post/Post";

const index = () => {
  return (
    <>
      <Post />
    </>
  );
};

export default withAuth(index);
