import RoundedTopContainer from "../components/RoundedTopContainer";
import { useEffect } from "react";

const getstarted = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  return (
    <RoundedTopContainer image={"/images/signup.png"} alt={"signup-image"}>
      Hello World!
    </RoundedTopContainer>
  );
};

export default getstarted;
