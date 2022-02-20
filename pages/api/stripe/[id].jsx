import { PrismaClient } from "@prisma/client";
import sessionOptions from "../../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
const prisma = new PrismaClient();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27"
});

export default withIronSessionApiRoute(async function (req, res) {
  const user = req.session.user;

  const { id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["payment_intent"]
  });

  const checkDuplicate = await prisma.payments.findMany({
    where: {
      session_id: session.id
    }
  });

  if (session.payment_status === "paid" && checkDuplicate.length === 0) {
    try {
      const addUser = await prisma.payments.create({
        data: {
          session_id: session.id,
          amount_cents: Number(session.amount_total),
          lawyer_id: Number(session.client_reference_id),
          client_id: Number(user.id)
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).json({ session });
}, sessionOptions);
