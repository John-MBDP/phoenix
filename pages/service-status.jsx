import { prisma } from "../lib/prisma";
import { useEffect } from "react";
import sessionOptions from "../lib/session";
import RoundedTopContainer from "../components/RoundedTopContainer";
import { withIronSessionSsr } from "iron-session/next";
import Payment from "../components/Payment";
import Alert from "../components/Alert";

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { id } = req.session.user;
  const userPayments = await prisma.payments.findMany({
    where: {
      client_id: id
    },
    include: {
      lawyers: true
    }
  });
  const parsedPayments = userPayments.map((payment) => {
    return {
      name: `${payment.lawyers.first_name} ${payment.lawyers.last_name}`,
      id: payment.id,
      profile_pic: payment.lawyers.profile_pic,
      session_id: payment.session_id,
      amount_cents: payment.amount_cents,
      description: payment.description
    };
  });
  return {
    props: {
      payments: parsedPayments
    }
  };
}, sessionOptions);

const SericeStatus = ({ setHeader, payments }) => {
  useEffect(() => setHeader({ hidden: true }), []);

  const paymentArray = payments.map((payment) => {
    return <Payment key={payment.id} {...payment} />;
  });

  return (
    <RoundedTopContainer height="80%" image="/images/backgrounds/book3.jpeg">
      <RoundedTopContainer.Header text="Service Status" />
      {paymentArray.length === 0 ? (
        <Alert message="Nothing to see here yet." />
      ) : null}
      <div className="container">{paymentArray}</div>

      <style jsx>{`
        .container {
          padding: 1rem 0 6rem 0;
        }
      `}</style>
    </RoundedTopContainer>
  );
};

export default SericeStatus;
