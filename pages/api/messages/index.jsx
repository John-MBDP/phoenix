import { prisma } from "../../../lib/prisma";
import sessionOptions from "../../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const user = req.session.user;
    const lawyerMessages = await prisma.messages.findMany({
      where: {
        client_id: {
          equals: user.id,
        },
        law_firm_id: {
          equals: null,
        },
      },
      include: {
        lawyers: true,
      },
      orderBy: [
        {
          date_sent: "desc",
        },
      ],
    });
    const lawfirmMessages = await prisma.messages.findMany({
      where: {
        client_id: {
          equals: user.id,
        },
        lawyer_id: {
          equals: null,
        },
      },
      include: {
        lawfirms: true,
      },
      orderBy: [
        {
          date_sent: "desc",
        },
      ],
    });
    const allMessages = lawyerMessages.concat(lawfirmMessages);
    return res.status(200).json(allMessages);
  } catch {
    return res.status(400).json({ error: "failed to load data" });
  }
}, sessionOptions);
