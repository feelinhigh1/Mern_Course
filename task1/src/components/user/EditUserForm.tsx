import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/utils/auth";

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
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
  };
}

export default function EditUserForm({ id }: EditUserFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    website: "",
    street: "",
    city: "",
    company: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setForm({
            name: data.name ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            username: data.username ?? "",
            website: data.website ?? "",
            street: data.address?.street ?? "",
            city: data.address?.city ?? "",
            company: data.company?.name ?? "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      username: form.username,
      website: form.website,
      address: {
        street: form.street,
        city: form.city,
      },
      company: {
        name: form.company,
      },
    };

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert("User updated successfully!");
      router.push("/users");
    } catch (error) {
      console.error("Update failed:", error);
      alert("An error occurred while updating the user.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading user data...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Edit User: <span className="text-cyan-700">{user?.name}</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <InputField
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
        />
        <InputField
          label="Street"
          name="street"
          value={form.street}
          onChange={handleChange}
        />
        <InputField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <InputField
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="bg-cyan-700 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-cyan-800 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/users")}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md shadow hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
      />
    </div>
  );
}
