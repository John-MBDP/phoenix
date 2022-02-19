import { useRouter } from "next/router";
import useSWR from "swr";

const potato = () => {
  const router = useRouter();

  const { session_id } = router.query;
  console.log(session_id);

  const { data, error } = useSWR(
    router.query.session_id ? `/api/stripe/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );
  // const {} = data;
  /*
    get session
    id , amount_subtotal,currency, customer_details( email), 

    payment_intent.charges.data.billing_details.address / country postal code
                                                name
                                reciept_url
*/
  return (
    <div>
      <br />
      <br />
      <br />
      <br />

      <br />
      <br />
      <br />
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
      <h1>Potato</h1>
    </div>
  );
};

export default potato;
