import { prisma } from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = JSON.parse(req.body);
    const { id, first_name, last_name, email, phone_number, address } = client;
    const clientWithSameEmail = await prisma.clients.findMany({
      where: {
        email,
        NOT: {
          id: {
            equals: id
          }
        }
      },
    });
    if (clientWithSameEmail.length > 0) {
      return res
        .status(409)
        .json({ error: "That email is already being used" });
    } else {
      const updatedClient = await prisma.clients.update({
        where: {
          id,
        },
        data: { first_name, last_name, email, phone_number, address },
      });
      return res.status(200).json(updatedClient);
    }
  } catch {
    res.status(400).json({ error: "failed to load data" });
  }
}
