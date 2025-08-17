import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getUsers, deleteUser } from "@/pages/api/rest_api";
import Link from "next/link";
import router from "next/router";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
}

interface UserType {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

interface DisplayUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: string;
  company: string;
}

function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function User() {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: UserType[] = await getUsers();

        const formatted = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          website: user.website,
          address: `${user.address?.street}, ${user.address?.city}`,
          company: user.company?.name,
        }));

        setUsers(formatted);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (user: DisplayUser) => {
    alert(`Clicked on user: ${user.name}`);
  };

  const handleEdit = (user: DisplayUser) => {
    router.push(`/users/edit/${user.id}`);
  };

  const handleDelete = async (user: DisplayUser) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (confirmDelete) {
      try {
        await deleteUser(user.id);
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      } catch (err) {
        alert("Failed to delete user.");
        console.error(err);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 md:p-6 flex flex-col items-center w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Users</h1>
        <Link
          href="/users/createUser"
          className="bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-cyan-800 transition duration-200"
        >
          + Create User
        </Link>
      </div>
      <div className="w-full overflow-auto">
        <Table
          data={users}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
