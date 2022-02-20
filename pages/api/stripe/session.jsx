import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27"
});
const prisma = new PrismaClient();

export default async (req, res) => {
  const { quantity, price, paymentType, returnPath, lawyerId } = req.body;
  console.log(quantity, price);

  console.log(typeof Number(price));

  const product = await prisma.product_prices.findFirst({
    where: {
      price: Number(price)
    }
  });
  console.log(product);

  const session = await stripe.checkout.sessions
    .create({
      mode: paymentType,
      payment_method_types: ["card"],
      line_items: [
        {
          price: product.price_id,
          quantity
        }
      ],
      success_url: `${req.headers.origin}/stripe/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}${returnPath}`,
      client_reference_id: lawyerId
    })
    .then((data) => {
      res.status(200).json({ sessionId: data.id });
    });
};
