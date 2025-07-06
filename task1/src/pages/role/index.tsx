// components/role/Table.tsx
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getRoles, deleteRole } from "@/pages/api/rest_api";
import withAuth from "@/hoc/withAuth";

interface DisplayRole {
  id: string | number;
  name: string;
  description: string;
}

const RoleTable = () => {
  const [roles, setRoles] = useState<DisplayRole[]>([]);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const handleDelete = async (role: any) => {
    if (confirm(`Are you sure you want to delete role: ${role.name}?`)) {
      try {
        await deleteRole(role.id); // 👈 API call to delete
        setRoles((prev) => prev.filter((r) => r.id !== role.id)); // 👈 update UI
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete role.");
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Roles</h1>
      </div>
      <Table data={roles} onDelete={handleDelete} />
    </div>
  );
};

export default withAuth(RoleTable);
