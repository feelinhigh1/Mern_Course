// components/role/Table.tsx
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getRoles, deleteRole } from "@/pages/api/rest_api";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import router from "next/router";

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

  const handleRowClick = (role: DisplayRole) => {
    alert(`Clicked on user: ${role.name}`);
  };

  const handleEdit = (role: DisplayRole) => {
    router.push(`/role/edit/${role.id}`);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Roles</h1>
        <Link
          href="/role/create"
          className="bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-cyan-800 transition duration-200"
        >
          + Create Role
        </Link>
      </div>
      <Table
        data={roles}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default withAuth(RoleTable);
