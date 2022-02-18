import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {

  const data = JSON.parse(req.body);

  try {
    const messages = await prisma.messages.findMany({
      where: {
        client_id: {
          equals: data.client_id,
        },
        lawyer_id: {
          equals: data.lawyer_id,
        },
      },
      orderBy: [
        {
          date_sent: "asc",
        },
      ],
    });
    res.status(200).json(messages);
  } catch {
    res.status(500).json({ error: "failed to load data" });
  }
}