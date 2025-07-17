import React from "react";
import EditCategoryForm from "@/components/Category/EditCategoryForm"; // adjust path if needed
import { useRouter } from "next/router";

const EditCategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <EditCategoryForm id={id} />
    </>
  );
};

export default EditCategoryPage;
