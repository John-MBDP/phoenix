import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PaymentButton from "../components/PaymentButton";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const [price, setPrice] = useState("");
  const [paymentType, setPaymentType] = useState("payment");

  const handleClick = async (e) => {
    console.log(e);
    setPrice(e.target.value);
    setPaymentType(e.target.name);
  };
  useEffect(async () => {
    if (price) {
      const { sessionId } = await fetch("/api/stripe/session", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ quantity: 1, price, paymentType })
      }).then((data) => data.json());

      const stripe = await stripePromise;
      const { error } = await stripe
        .redirectToCheckout({
          sessionId
        })
        .then((res) => res.json())
        .catch((err) => console.log(err, error));
    }
  }, [price]);

  return (
    <div>
      <br />
      <h1>Checkout</h1>
      <button role="link" value={125} name="payment" onClick={handleClick}>
        checkout
      </button>
      <button role="link" value={50} name="payment" onClick={handleClick}>
        checkout
      </button>
      <button role="link" value={200} name="payment" onClick={handleClick}>
        checkout
      </button>
      <button role="link" value={550} name="subscription" onClick={handleClick}>
        checkout
      </button>
      <button role="link" name="subscription" value={750} onClick={handleClick}>
        checkout
      </button>
      <button name="potototo" onClick={(e) => console.log(e, price)}></button>
      <PaymentButton />
    </div>
  );
};

export default Checkout;
