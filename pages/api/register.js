import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import withSession from "../../lib/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {
  const { firstName, lastName, email, password } = await req.body;

  try {
    if (req.method === "POST") {
      const userCheck = await prisma.clients.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (userCheck) {
        return res
          .status(409)
          .json({ message: "User already exists" });
      }
      // create user
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await prisma.clients.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      req.session.set("user", { id: user.id, email: user.email });
      await req.session.save();
      return res.status(200).end();
    }
    return res.status(400).end();
  } catch (error) {
    console.log(error, error.message);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.message);
  }
});
