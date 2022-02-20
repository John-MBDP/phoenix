import Widebutton from "../WideButton";
import { Typography } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentButton = ({ header, amount, paymentType, lawyerId }) => {
  const handleClick = async (e, paymentType, price) => {
    const returnPath = `/lawyer/${lawyerId}`;
    if (price) {
      const { sessionId } = await fetch("/api/stripe/session", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          quantity: 1,
          price,
          paymentType,
          returnPath,
          lawyerId
        })
      }).then((data) => data.json());

      const stripe = await stripePromise;
      const { error } = await stripe
        .redirectToCheckout({
          sessionId
        })
        .then((res) => res.json())
        .catch((err) => console.log(err, error));
    }
  };

  return (
    <Widebutton
      color="black"
      outLineColor="#1B4463"
      padding=" 0.3rem 0"
      outline
      strong
      ammount={`$${amount}`}
      onClick={(e) => handleClick(e, paymentType, amount)}
      target
      value="550"
    >
      <div>
        <Typography variant="button">
          <strong>{header}</strong>
        </Typography>
        <Typography variant="caption">click to see more</Typography>
        <style jsx>{`
          display: flex;
          flex-direction: column;
        `}</style>
      </div>
    </Widebutton>
  );
};

export default PaymentButton;
