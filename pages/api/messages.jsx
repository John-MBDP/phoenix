import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const message = JSON.parse(req.body);
    const savedMessage = await prisma.message.create({ data: message });
    res.status(200).json(savedMessage);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}
