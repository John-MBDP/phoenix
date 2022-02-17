import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../lib/session";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(async (req, res) => {
  const data = await req.body;
  const { firstName, lastName, email, password } = JSON.parse(data);

  try {
    if (req.method === "POST") {
      const userCheck = await prisma.clients.findFirst({
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
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashPassword,
        }
      });
      req.session.user = { id: user.id, email: user.email };
      await req.session.save();
      return res.status(200).end();
    }
    return res.status(400).end();
  } catch (error) {
    console.log(error, error.message);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.message);
  }
}, sessionOptions);