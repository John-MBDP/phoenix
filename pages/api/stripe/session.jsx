import Stripe from "stripe";
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27"
});

export default async (req, res) => {
  const { quantity } = req.body;
  const session = await stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity
        }
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/stripe/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`
    })
    .then((data) => {
      res.status(200).json({ sessionId: data.id });
    });
};
// one time
// 50 - price_1KUj1UC92AcJPbGeqX65kMsi
// 125 - price_1KUj1UC92AcJPbGeajS1Vtrk
// 200 - price_1KUj1UC92AcJPbGekgGRwLSO

// 550 - price_1KUj2ZC92AcJPbGeBebPXPNF
// 750 - price_1KUj2ZC92AcJPbGecv0Yx1w0
// 1000 - price_1KUj2ZC92AcJPbGeJi6AEF58
