import { PrismaClient } from "@prisma/client";
import sessionOptions from "../../../lib/session";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(async (req, res) => {
  const { email, password } = await req.body;

  try {
    const user = await prisma.clients.findFirst({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      req.session.user = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      };
      await req.session.save();
      return res.json(user);
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}, sessionOptions);
