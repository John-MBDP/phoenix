import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatsCard from "../components/UserStatsCard";
import { useEffect } from "react";

const Payments = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ heading: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);

  return (
    <RoundedTopContainer image="/images/paint.jpeg" alt="paint" height="600px">
      <UserStatsCard />
      <RoundedTopContainer.Header text="Choose Payment Option" />
    </RoundedTopContainer>
  );
};

export default Payments;
