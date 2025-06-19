// This component fetches and displays user data in a table format.

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getUsers } from "@/pages/api/rest_api";

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

export default function User() {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then((data: UserType[]) => {
        const formatted = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          website: user.website,
          address: `${user.address.street}, ${user.address.city}`,
          company: user.company.name,
        }));
        setUsers(formatted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleRowClick = (user: DisplayUser) => {
    alert(`Clicked on user: ${user.name}`);
  };

  if (loading) return <p className="p-6">Loading users...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 md:p-6 flex flex-col items-center w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Users</h1>
      <div className="w-full overflow-auto">
        <Table data={users} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}
