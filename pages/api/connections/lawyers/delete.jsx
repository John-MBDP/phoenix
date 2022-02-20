import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const connection = JSON.parse(req.body);
    const destroyedConnection = await prisma.lawyer_connections.deleteMany({
      where: {
        lawyer_id: {
          equals: connection.lawyer_id,
        },
        client_id: {
          equals: connection.client_id,
        },
      },
    });
    res.status(200).json(destroyedConnection);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}