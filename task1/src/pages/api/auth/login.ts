import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const ADMIN_USER = {
  username: "admin123",
  password: "secret123",
};

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Better to use env variables

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
}
