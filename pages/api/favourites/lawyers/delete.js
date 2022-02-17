import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const favourite = JSON.parse(req.body);
    const destroyedFavourite = await prisma.lawyer_favourites.deleteMany({
      where: {
        lawyer_id: {
          equals: favourite.lawyer_id,
        },
        client_id: {
          equals: favourite.client_id,
        },
      },
    });
    res.status(200).json(destroyedFavourite);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}
