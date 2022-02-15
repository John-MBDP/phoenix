import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatsCard from "../components/UserStatsCard";
import { useEffect } from "react";

const Payments = ({ setHeader }) => {
  useEffect(() => setHeader({ heading: "", hidden: true }), []);

  return (
    <RoundedTopContainer image="/images/paint.jpeg" alt="paint" height="600px">
      <UserStatsCard />
      <RoundedTopContainer.Header text="Choose Payment Option" />
    </RoundedTopContainer>
  );
};

export default Payments;
