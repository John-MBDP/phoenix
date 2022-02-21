import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await prisma.clients.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.status(200).json(user);
  } else {
    res.status(404);
  }
}
