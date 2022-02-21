import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const article = await prisma.articles.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.status(200).json(article);
  } catch {
    res.status(500).json({ error: "Failed to load data" });
  }
}
