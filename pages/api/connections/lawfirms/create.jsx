import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const connection = JSON.parse(req.body);
    const savedConnection = await prisma.lawfirm_connections.create({ data: connection });
    res.status(200).json(savedConnection);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}