import { useState } from "react";
import LoginCard from "../components/LoginCard";
import useUser from "../hooks/useUser";

const Login = ({ setHeader }) => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async inputValues => {
    if (!inputValues.email || !inputValues.password) {
      setErrorMsg("Please provide your email and password");
      return;
    }
    try {
      mutateUser(
        await fetch("api/auth/login", {
          method: "POST",
          body: JSON.stringify(inputValues),
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  };

  return (
    <LoginCard
      setHeader={setHeader}
      errorMessage={errorMsg}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
