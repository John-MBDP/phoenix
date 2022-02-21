import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatCard from "../../components/UserStatsCard";

const Purchase = ({ setHeader, setNavbar }) => {
  const router = useRouter();
  const { session_id } = router.query;
  const [pageData, setPageData] = useState(null);

  const { data, error } = useSWR(
    router.query.session_id ? `/api/stripe/${session_id}` : null,
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPageData(data);
          return data;
        })
  );

  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ hidden: false });
  }, []);

  return (
    <RoundedTopContainer image="/images/book3.jpeg" height="600px">
      <UserStatCard image="/images/accepted.png"> </UserStatCard>
      <div className="container">
        {pageData ? (
          <>
            <h3>Payment Successful!</h3>
            <h4>
              {`An email will be sent to
          ${pageData.session.customer_details.email} shortly`}
            </h4>
            <Link href="/">
              <a>Go back home</a>
            </Link>
          </>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>

      <style jsx>{`
        .container {
          padding-top: 2rem;
          text-align: center;
          display: flex;
          align-items: center;
          justigy-content: center;
          flex-direction: column;
          height: 100%;
        }
        a {
          color: #ff0056;
          text-decoration: underline;
        }
      `}</style>
    </RoundedTopContainer>
  );
};

export default Purchase;
