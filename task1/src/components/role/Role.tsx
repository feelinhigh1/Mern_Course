import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getRoles, deleteRole } from "@/pages/api/rest_api";
import Link from "next/link";
import router from "next/router";

interface DisplayRole {
  id: string | number;
  name: string;
  description: string;
}

const Role = () => {
  const [roles, setRoles] = useState<DisplayRole[]>([]);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const handleDelete = async (role: DisplayRole) => {
    if (confirm(`Are you sure you want to delete role: ${role.name}?`)) {
      try {
        await deleteRole(Number(role.id));
        setRoles((prev) => prev.filter((r) => r.id !== role.id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete role.");
      }
    }
  };

  const handleRowClick = (role: DisplayRole) => {
    alert(`Clicked on role: ${role.name}`);
  };

  const handleEdit = (role: DisplayRole) => {
    router.push(`/roles/edit/${role.id}`);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-4 md:p-6 flex flex-col items-center w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Roles</h1>
        <Link
          href="/roles/create"
          className="bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-cyan-800 transition duration-200"
        >
          + Create Role
        </Link>
      </div>
      <div className="w-full overflow-auto">
        <Table
          data={roles}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Role;
