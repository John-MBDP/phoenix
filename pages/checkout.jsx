import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const handleClick = async (e) => {
    const { sessionId } = await fetch("/api/stripe/session", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ quantity: 1 })
    }).then((data) => data.json());

    const stripe = await stripePromise;
    const { error } = await stripe
      .redirectToCheckout({
        sessionId
      })
      .then((res) => res.json());
  };

  return (
    <div>
      <br />
      <h1>Checkout</h1>
      <button role="link" onClick={handleClick}>
        checkout
      </button>
    </div>
  );
};

export default Checkout;
