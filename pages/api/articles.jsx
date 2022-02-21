import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const articles = await prisma.articles.findMany();
    res.status(200).json(articles);
  } catch {
    res.status(500).json({ error: "failed to load data" });
  }
}
