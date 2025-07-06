export const baseUrl = "http://localhost:3000/api";

export async function getUsers() {
  const res = await fetch(`${baseUrl}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}

export async function getRoles() {
  const res = await fetch(`${baseUrl}/role`);
  if (!res.ok) {
    throw new Error("Failed to fetch roles");
  }
  return res.json();
}

export async function deleteRole(id: number) {
  const res = await fetch(`${baseUrl}/role/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete role");
  }

  return res.json();
}
