import { getToken } from "@/utils/auth";

export const baseUrl = "http://localhost:3000/api";

export async function getUsers() {
  const res = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}

export async function getRoles() {
  const res = await fetch(`${baseUrl}/role`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch roles");
  }
  return res.json();
}

export async function deleteRole(id: number) {
  const res = await fetch(`${baseUrl}/role/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete role");
  }

  return res.json();
}

export async function createRole(role: { name: string; description: string }) {
  const res = await fetch(`${baseUrl}/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(role),
  });

  if (!res.ok) {
    throw new Error("Failed to create role");
  }

  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${baseUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`${baseUrl}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete category");
  }

  return res.json();
}

export async function createCategory(category: {
  name: string;
  title: string;
}) {
  const res = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(category),
  });

  if (!res.ok) {
    throw new Error("Failed to create category");
  }

  return res.json();
}

export async function getPosts() {
  const res = await fetch(`${baseUrl}/post`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function deletePost(id: number) {
  const res = await fetch(`${baseUrl}/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
}
