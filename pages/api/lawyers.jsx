import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id, location } = req.query;
  if (req.method !== "POST") {
    res.status(400).json({ error: "We do not currently support this Method" });
  } else {
    const lawyersFromLocation = await prisma.lawyers.findMany({
      where: {
        location: {
          contains: location,
          mode: "insensitive"
        }
      }
    });
    console.log(lawyersFromLocation, location);
    res.status(200).json(lawyersFromLocation);
  }
}
