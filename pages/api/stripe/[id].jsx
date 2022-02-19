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
  console.log(user);
  const { id } = req.query;

  console.log(id);
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["payment_intent"]
  });

  if (session.payment_status === "paid") {
    console.log(session.client_reference_id);
  }

  res.status(200).json({ session });
}, sessionOptions);
