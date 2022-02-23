import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const getStripe = () => {
  if (!stripe) {
    stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);
  }
  return stripePromise;
};

export default getStripe;
