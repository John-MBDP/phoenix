import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../lib/session";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(async (req, res) => {
  const { firstName, lastName, email, password } = await req.body;

  try {
    if (req.method === "POST") {
      const userCheck = await prisma.clients.findFirst({
        where: { email: email.toLowerCase() },
      });
      if (userCheck) {
        return res.status(409).json({ message: "User already exists" });
      } else if (password.length <= 5) {
        return res
          .status(409)
          .json({ message: "Password must be at least 6 characters" });
      }
      // create user
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await prisma.clients.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashPassword,
        },
      });
      req.session.user = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      };
      await req.session.save();
      return res.json(user);
    }
    return res.status(400).end();
  } catch (error) {
    console.log(error, error.message);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.message);
  }
}, sessionOptions);
