// components/EditUserForm.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface EditUserFormProps {
  id: string | string[] | undefined;
}

interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

export default function EditUserForm({ id }: EditUserFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setForm({
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
          setLoading(false);
        })
        .catch(() => {
          alert("Failed to load user");
          router.push("/users");
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated API update
    console.log("Updated user:", { id, ...form });

    alert("User updated successfully!");
    router.push("/users");
  };

  if (loading) return <p className="p-6">Loading user data...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User: {user?.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/users")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
