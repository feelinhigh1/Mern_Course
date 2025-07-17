import React, { useState } from "react";

import axios from "axios";
import router from "next/router";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("User Created:", formData);
  //   // submit to API here
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userPayload = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.street,
        city: formData.city,
      },
      company: {
        name: formData.company,
      },
    };

    try {
      await axios.post("http://localhost:3000/api/users", userPayload); // ← your Express API endpoint
      router.push("/users"); // redirect after success
    } catch (err) {
      console.error("Failed to create user", err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Create New User
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-cyan-700 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-800 transition"
            onClick={handleSubmit}
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
