import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await prisma.lawfirms.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.status(200).json(user);
  } else {
    res.status(404);
  }
}
