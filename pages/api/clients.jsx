import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const { first_name, last_name, password, phone_number, email } = req.query;

  if (req.method === "POST") {
    const user = await prisma.clients.create({
      data: {
        first_name,
        last_name,
        password,
        phone_number,
        email,
        address: "64 potato way"
      }
    });
    res.status(200).json(user);
    return prisma.$disconnect;
  }
  if (req.method === "GET") {
    const users = await prisma.clients.findMany();
    res.status(200).json(users);
  }
  res.status(404);
}
