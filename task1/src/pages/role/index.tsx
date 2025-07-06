import React from "react";
import RoleTable from "@/components/role/Table";
import withAuth from "@/hoc/withAuth";

const index = () => {
  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Roles</h1>
      </div>
      <RoleTable />
    </div>
  );
};

export default withAuth(index);
