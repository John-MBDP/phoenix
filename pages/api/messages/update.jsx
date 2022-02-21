import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { clientId, lawyerId } = JSON.parse(req.body);
    const savedMessage = await prisma.messages.updateMany({
      where: {
        client_id: { equals: clientId },
        lawyer_id: { equals: lawyerId },
      },
      data: { seen_client: true },
    });
    res.status(200).json(savedMessage);
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}
