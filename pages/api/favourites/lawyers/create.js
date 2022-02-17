import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const favourite = JSON.parse(req.body);
    const savedFavourite = await prisma.lawyer_favourites.create({ data: favourite });
    res.status(200).json(savedFavourite);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}
