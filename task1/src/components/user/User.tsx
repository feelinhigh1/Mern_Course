import React from "react";
import Table from "@/components/Table";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Moderator" },
];

export default function User() {
  const handleRowClick = (user: (typeof users)[0]) => {
    alert(`Clicked on user: ${user.name}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Table data={users} onRowClick={handleRowClick} />
    </div>
  );
}
