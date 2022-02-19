import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = JSON.parse(req.body);
    const updatedClient = await prisma.clients.update({
      where: {
        client_id: { equals: client.id },
      },
      data: { client },
    });
    res.status(200).json(updatedClient);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}
