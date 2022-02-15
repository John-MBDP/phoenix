import { PrismaClient } from "@prisma/client";
import withSession from "../../../lib/session";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {
  const data = await req.body;
  const { email, password } = JSON.parse(data);

  try {
    const user = await prisma.clients.findFirst({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      req.session.set("user", { id: user.id, email: user.email });
      await req.session.save();
      return res.json(user);
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
