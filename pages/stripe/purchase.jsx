import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

export default async () => {
  const router = useRouter();

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
};
