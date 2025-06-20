import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const ADMIN_USERS = [
  { username: "admin123", password: "secret123" },
  { username: "admin1234", password: "secret1234" },
];

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const admin = ADMIN_USERS.find(
    (user) => user.username === username && user.password === password
  );

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: admin.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ token });
}
